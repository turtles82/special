//Copyright (C) 2023 ading2210
//see README.md for more information

/**
 * Mirror failover module
 * Handles automatic failover to backup mirrors when primary is unavailable
 */

class MirrorClient {
  constructor() {
    this.mirrors = [];
    this.health_status = {}; // { url: { healthy: bool, last_check: timestamp } }
    this.last_successful_mirror = null;
    this.config = null;
    this.loading = false;
  }

  /**
   * Initialize mirrors configuration from server or localStorage
   */
  async initialize() {
    if (this.loading) {
      // Wait for ongoing initialization
      return new Promise(resolve => {
        const check = setInterval(() => {
          if (!this.loading && this.mirrors.length > 0) {
            clearInterval(check);
            resolve();
          }
        }, 100);
      });
    }

    this.loading = true;

    try {
      // Try to fetch mirrors from server
      const response = await fetch(this.get_base_url() + "/api/mirrors");
      if (response.ok) {
        const data = await response.json();
        this.mirrors = data.mirrors || [];
        this.config = data.config || {};
      }
    } catch (error) {
      console.warn("Failed to fetch mirrors from server, using defaults");
    }

    // Load last successful mirror from localStorage
    const cached_mirror = localStorage.getItem("mirror_client_last_mirror");
    if (cached_mirror) {
      this.last_successful_mirror = cached_mirror;
    }

    // Initialize health status
    if (this.mirrors.length === 0) {
      // Use a default mirror if none configured
      this.mirrors = [{ url: this.get_base_url(), priority: 1, name: "Default" }];
    }

    for (let mirror of this.mirrors) {
      this.health_status[mirror.url] = { healthy: true, last_check: null };
    }

    this.loading = false;
  }

  /**
   * Get the base URL of the current server
   */
  get_base_url() {
    // Return the URL of the current running server
    if (typeof base_url !== "undefined") {
      return base_url; // Use globally defined base_url if available
    }
    // Fallback to current window location
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}`;
  }

  /**
   * Get all mirrors sorted by priority
   */
  get_sorted_mirrors() {
    return [...this.mirrors].sort((a, b) => a.priority - b.priority);
  }

  /**
   * Get available mirrors (excluding unhealthy ones)
   */
  get_available_mirrors() {
    return this.get_sorted_mirrors().filter(mirror => {
      const status = this.health_status[mirror.url];
      return !status || status.healthy !== false; // Assume healthy if no status yet
    });
  }

  /**
   * Check if a single mirror is healthy
   */
  async test_mirror_health(url) {
    try {
      const endpoint = this.config?.health_check?.endpoint || "/health";
      const timeout = this.config?.health_check?.timeout_ms || 5000;

      const controller = new AbortController();
      const timeout_id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url + endpoint, {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors"
      });

      clearTimeout(timeout_id);

      this.health_status[url].healthy = response.ok || response.status === 0; // 0 for no-cors
      this.health_status[url].last_check = Date.now();

      return this.health_status[url].healthy;
    } catch (error) {
      console.warn(`Mirror health check failed for ${url}:`, error);
      this.health_status[url].healthy = false;
      this.health_status[url].last_check = Date.now();
      return false;
    }
  }

  /**
   * Fetch from a mirror with automatic failover
   * @param {string} endpoint - API endpoint (e.g., "/api/answers")
   * @param {object} options - Fetch options
   * @param {array} exclude_urls - URLs to skip during retry
   * @returns {Response} - Fetch response
   */
  async fetch_from_mirror(endpoint, options = {}, exclude_urls = []) {
    await this.initialize();

    let mirrors_to_try = this.get_available_mirrors().filter(
      m => !exclude_urls.includes(m.url)
    );

    if (mirrors_to_try.length === 0) {
      // If all mirrors are unhealthy, try all of them anyway
      mirrors_to_try = this.get_sorted_mirrors().filter(
        m => !exclude_urls.includes(m.url)
      );
    }

    // Sort: try last successful mirror first
    if (this.last_successful_mirror) {
      mirrors_to_try.sort((a, b) => {
        if (a.url === this.last_successful_mirror) return -1;
        if (b.url === this.last_successful_mirror) return 1;
        return a.priority - b.priority;
      });
    }

    let last_error = null;
    let attempt = 0;
    const max_retries = this.config?.failover?.max_retries || 2;

    for (let mirror of mirrors_to_try) {
      for (let retry = 0; retry <= max_retries; retry++) {
        try {
          const url = mirror.url + endpoint;
          
          if (retry > 0) {
            const backoff_ms = (this.config?.failover?.initial_backoff_ms || 1000) *
                              Math.pow(this.config?.failover?.backoff_multiplier || 2, retry - 1);
            await new Promise(resolve => setTimeout(resolve, backoff_ms));
            console.log(`Retrying mirror ${mirror.name} (attempt ${retry + 1}/${max_retries})...`);
          }

          const response = await fetch(url, options);

          if (response.ok) {
            // Success! Update last successful mirror
            this.last_successful_mirror = mirror.url;
            localStorage.setItem("mirror_client_last_mirror", mirror.url);
            this.health_status[mirror.url].healthy = true;

            console.log(`✓ Using mirror: ${mirror.name} (${mirror.url})`);
            return response;
          } else if (response.status === 429 || response.status >= 500) {
            // Rate limit or server error - try next mirror
            console.warn(`Mirror ${mirror.name} returned status ${response.status}, trying next...`);
            break; // Break retry loop, try next mirror
          } else {
            // Other errors (4xx) - likely don't retry
            return response;
          }
        } catch (error) {
          last_error = error;
          console.warn(`Fetch from ${mirror.name} failed:`, error);

          if (retry < max_retries) {
            continue; // Retry same mirror
          }
          break; // Move to next mirror
        }
      }
    }

    // All mirrors failed - return last error
    if (last_error) {
      console.error("All mirrors failed. Last error:", last_error);
      throw last_error;
    }

    // Shouldn't reach here, but fallback to error
    throw new Error("All mirrors failed to respond");
  }

  /**
   * Start periodic health checks (optional)
   */
  start_health_checks() {
    const interval = this.config?.health_check?.interval_ms || 30000;

    setInterval(async () => {
      for (let mirror of this.mirrors) {
        await this.test_mirror_health(mirror.url);
      }
    }, interval);
  }

  /**
   * Get mirror status for display
   */
  get_status_string() {
    const available = this.get_available_mirrors();
    const total = this.mirrors.length;
    return `${available.length}/${total} mirrors online`;
  }
}

export const mirror_client = new MirrorClient();
