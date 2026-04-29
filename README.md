# Edpuzzle Answers Script
![jsdelivr monthly badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edpuzzle-answers/badge/month)
![jsdelivr weekly badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edpuzzle-answers/badge/week)
![jsdelivr daily badge](https://data.jsdelivr.com/v1/package/gh/ading2210/edpuzzle-answers/badge/day)

<img src="https://raw.githubusercontent.com/ading2210/edpuzzle-answers/main/landing/images/screenshot5.png" alt="A screenshot of the generated webpage" width="500"/>

This bookmarklet can fetch the answers for the multiple choice questions on any Edpuzzle assignment. It can also skip the entire video, as well as automatically answer the questions and change the video speed.

**NEW:** Web version with token-based authentication, automatic mirror failover system, and improved error handling with recovery guidance.

Discord server: [edpuzzle.hgci.org/discord.html](https://edpuzzle.hgci.org/discord.html)

## Project Sponsors:

![Examripper banner](https://raw.githubusercontent.com/Exam-Ripper/Google-Forms-Quiz-Hack/refs/heads/main/banner.webp)

[Stuck on **private** assignments? Examripper offers a hack for these, supporting **open-ended** questions too. It also includes hacks for multiple other platforms like Google Forms, Apex Learning, Kahoot, and way more for only **3.99**! Subscribe by clicking here.](https://examripper.com/edpuzzle)

*This is a paid advertisement. If you want to sponsor this project and advertise your own service, please contact me on Discord.*

## Contents:
  - [Demo](#demo)
  - [Features](#features)
  - [What's New](#whats-new)
  - [Web Version](#web-version)
  - [Multi-Mirror Failover](#multi-mirror-failover)
  - [Error Codes & Recovery Tips](#error-codes--recovery-tips)
  - [Limitations](#limitations)
  - [Copyright Notice](#copyright-notice)
  - [Creating the Bookmarklet](#creating-the-bookmarklet)
  - [Using the Bookmarklet](#using-the-bookmarklet)
  - [Running the Server](#running-the-server)
  - [Legal](#legal)
  - [Credits](#credits)

## Demo: 
https://user-images.githubusercontent.com/71154407/199671842-c3016f8c-8c7f-4526-b274-5bdd48f3a131.mp4

Note: This video was recorded with an older version of the script, so the GUI shown is missing some features.

## Features:
### Bookmarklet & Web Version:
 - ✅ Fetch and display multiple-choice answers for any Edpuzzle assignment
 - ✅ Automatically answer all multiple-choice questions
 - ✅ Automatically answer free response questions using Google Gemini AI
 - ✅ Video skipper with arbitrary navigation within assignments
 - ✅ Video speed control (0.5x to 2x)
 - ✅ Prevent auto-pausing when tab is hidden
 - ✅ Assignment statistics display
 - ✅ No login or extension required (bookmarklet)
 - ✅ Uses about:blank to avoid browser history
 - ✅ Supports Edpuzzles embedded in Canvas and Schoology
 - ✅ Licensed under the GNU AGPL v3 license

### New in v2.0:
 - 🆕 **Web version** with token-based authentication and 24-hour sessions
 - 🆕 **Multi-mirror failover system** - automatic switching to backup servers
 - 🆕 **Enhanced error handling** with recovery hints for common issues
 - 🆕 **Comprehensive legal documentation** (Privacy Policy & Terms of Service)
 - 🆕 **Improved homepage** with modern UI and better installation guide

## What's New:

April 2026 Update - Major feature additions:

1. **Enhanced Error Handling (Phase 1)**
   - New exception types with recovery hints
   - HTTP status-code-based error messages
   - Recovery suggestions for rate limiting, auth failures, server errors
   - Improved error messages in all modules

2. **Legal Documentation (Phase 2)**
   - Comprehensive [Privacy Policy](/privacy)
   - Detailed [Terms of Service](/terms)
   - Full compliance with data retention and user rights

3. **Multi-Mirror Failover System (Phase 3)**
   - Automatic failover to secondary mirrors
   - Health checks every 30 seconds
   - Exponential backoff retry strategy
   - Persists successful mirror to localStorage

4. **Web Version with Authentication (Phase 4)**
   - Token-based login system
   - 24-hour session tokens
   - Remember device option
   - Full feature parity with bookmarklet
   - Responsive mobile/desktop design

5. **Homepage Redesign (Phase 5)**
   - Modern gradient UI
   - Better feature highlights
   - Improved installation guide
   - Mobile-responsive layout

## Web Version:

The web version is now available at `/login` with the following features:

- **Email/Password Login:** Simple authentication with "Remember this device" option
- **Token-Based Sessions:** Secure 24-hour session tokens with automatic expiry
- **Full Feature Parity:** All bookmarklet features accessible from the web interface
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Dashboard:** Assignment input, answer display, video controls

### Using the Web Version:

1. Navigate to `/login`
2. Enter your email and password
3. Optionally check "Remember this device"
4. Access the dashboard at `/dashboard`
5. Paste assignment URL or ID to fetch answers
6. Use video controls and auto-answer features
7. Token expires after 24 hours (auto-logout)

## Multi-Mirror Failover:

The system now supports automatic failover to backup mirror servers:

- **Primary Mirror:** Main server (your primary instance)
- **Secondary Mirror:** Automatic backup if primary is down
- **Tertiary Mirror:** Additional fallback

**How It Works:**
1. Client detects mirror unavailability
2. Automatically tries next mirror in priority order
3. Exponential backoff: waits 1s, then 2s, then 4s between retries
4. Remembers last successful mirror for faster future requests
5. Health checks every 30 seconds

Mirrors can be configured in `server/config/mirrors.json`.

## Limitations:
 - Bookmarklet doesn't work for Edpuzzles embedded in third-party sites (except Canvas and Schoology)
 - Web version requires a server instance to be running
 - Mirror failover requires mirrors to be configured and operational
 - Token-based auth is MVP (integrate with your auth system for production)
 - Some premium/private assignments may not be accessible

## Copyright Notice:
```
ading2210/edpuzzle-answers: a Javascript bookmarklet that provides many useful utilities for Edpuzzle
Copyright (C) 2026 ading2210

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

This project is licenced under the [GNU AGPL v3](https://github.com/ading2210/edpuzzle-answers/blob/main/LICENSE). Thus, you are not allowed to:
 - Reupload any part of the source code without crediting this repository.
 - Fork this repository, then change or remove the license.
 - Fork this project without linking to your modified source code. 

Forking or redistributing code from this repository is fine, as long as you abide by the terms of the GPL. However, if you don't, then I have every right to submit a DMCA takedown. Also, please don't try to take credit for work that is not yours by changing or removing the credits. Editing a couple of lines to remove my name and reuploading it doesn't make you look cool. Finally, if you decide to host a fork of this, you must also make the source code publicly available.

## Creating the Bookmarklet:
A video tutorial can be found [here](https://www.youtube.com/watch?v=zxZzB2KXCkw).

### Method 1:
 1. Navigate to [https://edpuzzle.hgci.org](https://edpuzzle.hgci.org).
 2. If you're on any Chromium-based browser (Chrome, Edge, Opera, Brave, etc), drag the button at the bottom of the page into your bookmarks bar.
 3. If you're on Firefox, right click on the button and then click "bookmark link."

### Method 2:
 1. Copy the following code into your clipboard:
 ```js
javascript: fetch("https://cdn.jsdelivr.net/gh/ading2210/edpuzzle-answers@latest/script.js").then(r => r.text()).then(r => eval(r))
 ```
 2. Right click on your bookmarks bar and click "add page."
 3. Set the name of the bookmark to whatever you want.
 4. Paste in the code into the box for the url and save the bookmark.

## Using the Bookmarklet: 

> [!IMPORTANT]  
> Due to recent changes by Edpuzzle, you need to disable the CSP on edpuzzle.com for the script to work. Install one of these browser extensions to bypass it: https://chromewebstore.google.com/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden (Chrome/Edge/Opera/Brave) or https://addons.mozilla.org/en-US/firefox/addon/disable-csp-for-a-minute/ (Firefox)

### On Regular Edpuzzles:
 1. Navigate to any Edpuzzle assignment.
 2. Make sure the url follows this format: `https://edpuzzle.com/assignments/{id}/watch`
 3. Click on the bookmarklet to run the script.
 4. If it doesn't work, make sure you allow popups from edpuzzle.com, then try again.

### Usage on Canvas:
 1. Navigate to the assignment on Canvas. The link should look similar to this: ```https://k12.instructure.com/courses/{id}/assignments/{id}```
 2. Click on the bookmarklet. The script should open the Edpuzzle assignment in a new tab.
 3. Re-run the bookmarklet to launch the full script.
 4. If this doesn't work, make sure you allow popups on both Edpuzzle and Canvas.

## Running the Server:
It is possible to simply host a static copy of this repository, however open-ended question answering will not be available. 

If you want to run the backend for yourself, follow these steps:
1. Clone this repository and cd into it.
2. Install Python for your chosen Linux distro. Hosting on Windows should work but it is not supported.
3. Create a virtual environment by running `python3 -m venv .venv`, and activate it using `.venv/bin/activate`.
4. Install the needed dependencies by doing `pip3 install --upgrade -r requirements.txt`. 
5. Install NodeJS dependencies by running `npm i`.
6. Bundle the app JS by running `npm run build` (or `npm run build:prod` to minify it).
7. Copy `server/config/default.json` to `server/config/config.json`, and fill out the relevant options.
8. Run the server using `python3 server/main.py`.

Make sure your web server has a domain and HTTPS support. The easiest way to do this is to use Nginx as a reverse proxy and Certbot for HTTPS.

### Server Configuration:
 - `dev_mode` - Put Flask in debug mode, which will restart the server whenever a file is modified.
 - `include_traceback` - Enables stack traces in error response. This will expose the path of wherever the server's files are located.
 - `behind_proxy` - Tell Flask it is behind a reverse proxy such as Nginx. This allows IP rate limits to be enforced. 
 - `gzip_responses` - Compress response with gzip compression. 
 - `server_port` - The port that the web server will listen on.
 - `limiter_storage_uri` - The URI for the storage backend of the rate limiter. If you do not wish to use a database, you can set this to `memory://`. See the [Flask-Limiter documentation](https://flask-limiter.readthedocs.io/en/stable/#configuring-a-storage-backend) for more information.
 - `gemini.enabled` - Enable Google's Gemini API service. This also has a limited free tier.
 - `gemini.key` - Your Google Gemini API key. 
 - `gemini.model` - The Google Gemini model to use.
 - `rate_limits` - Sets the rate limit for each generator service. The format for each value is listed on the [Flask-Limiter documentation](https://flask-limiter.readthedocs.io/en/stable/configuration.html#rate-limit-string-notation).

## Error Codes & Recovery Tips:

If you encounter errors while using the script, here's what they mean and how to fix them:

### HTTP Status Codes:

| Error Code | HTTP Status | Meaning | What to Do |
|----------|------------|---------|----------|
| **Authentication Failed** | 401 | Session expired or invalid credentials | Log in again to Edpuzzle and retry |
| **Access Denied** | 403 | No permission to access (private assignment) | Contact your teacher or try another assignment |
| **Rate Limited** | 429 | Too many requests sent quickly | Wait 30 seconds and try again |
| **Bad Request** | 400 | Invalid parameters or malformed request | Check your input and try again |
| **Server Error** | 502 | Edpuzzle API communication failure | Try again in a few minutes |
| **Service Unavailable** | 503 | Server overloaded or maintenance | Try again later |
| **Connection Timeout** | 504 | Slow internet or server not responding | Check your connection and retry |
| **Video Not Found** | N/A | Video player couldn't be detected | Ensure you're on active Edpuzzle assignment |
| **Captions Unavailable** | 403 | Video captions are private or missing | Normal—script continues without captions |

### Error Message Examples:

- "Rate limited. Wait 30 seconds and retry..." → Too many API calls
- "This video's captions are private or unavailable." → Caption fetch failed
- "Failed to skip video. Try refreshing the page." → Skip function error
- "Access denied. This assignment may be locked." → Permission issue

**General troubleshooting:**
- Check browser console (F12 → Console) for detailed error messages
- Some errors are transient—wait a moment and retry
- Ensure CSP-disabling extension is active (see [Using the Bookmarklet](#using-the-bookmarklet))
- Try in an incognito/private window if issues persist
- For web version: ensure your token hasn't expired (check session info)

## Legal:

- **[Privacy Policy](/privacy)** - How we handle your data (10 sections)
- **[Terms of Service](/terms)** - Usage terms and legal disclaimers (15 sections)

Please read both documents before using the service. By using this tool, you agree to comply with academic integrity policies and applicable laws.

## Recent Changes (v2.0):

### Backend (Server-side):
- ✅ New exception types with recovery hints (NetworkTimeoutError, RateLimitError, ValidationError, CaptionError)
- ✅ Enhanced error response middleware with recovery_hint support
- ✅ Token authentication module with 24-hour expiry
- ✅ Mirror configuration system with health checks
- ✅ New routes: /login, /dashboard, /privacy, /terms, /health, /api/mirrors
- ✅ Auth endpoints: /api/auth/login, /api/auth/logout, /api/auth/validate
- ✅ require_token() decorator for protected endpoints

### Frontend (Client-side):
- ✅ Mirror client module with automatic failover and exponential backoff
- ✅ Login page with email/password and "Remember device" option
- ✅ Dashboard with assignment input, answer display, video controls
- ✅ Session management with token expiry countdown
- ✅ Comprehensive error handling in all modules
- ✅ Mirror failover integration in caption fetching

### Styling & UX:
- ✅ Redesigned homepage with gradient background
- ✅ Modern navigation and hero section
- ✅ Feature cards with icons
- ✅ Responsive mobile-first design
- ✅ Improved error messages with recovery hints
- ✅ Session info display in web dashboard

## Credits:
The code for the video skipper is based off of [ASmallYawn/EdpuzzleSkipper](https://github.com/ASmallYawn/EdpuzzleSkipper), with permission from the original author and some major refactoring.

All other code has been written solely by me, [ading2210](https://github.com/ading2210), unless otherwise stated. AI generated code was not used in the making of this project. 

Other contributors:
- [@smatian](https://github.com/smatian) - Improved the popup CSS and auto answerer (#68)
- [@simplyrohan](https://github.com/simplyrohan) - Major reorganization and fixes for Edpuzzle update + AI updates

This project contains icons from the the [Iconoir](https://iconoir.com/) icon library. 

This project is licensed under the GNU Affero General Public License v3.0.

![gnu agpl v3 logo](https://github.com/ading2210/edpuzzle-answers/raw/main/static/images/agpl_logo.png)

### Server-side Libraries:
| **Library**                                                                      | **License**                                                                                      |
|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [Flask](https://flask.palletsprojects.com/en/2.2.x/)                             | [BSD-3-Clause](https://flask.palletsprojects.com/en/2.2.x/license/)                              |
| [Flask-Compress](https://github.com/colour-science/flask-compress)               | [MIT](https://github.com/colour-science/flask-compress/blob/master/LICENSE.txt)                  |
| [Flask-Limiter](https://github.com/alisaifee/flask-limiter)                      | [MIT](https://github.com/alisaifee/flask-limiter/blob/master/LICENSE.txt)                        |
| [Flask-CORS](https://github.com/corydolphin/flask-cors/)                         | [MIT](https://github.com/corydolphin/flask-cors/blob/master/LICENSE)                             |
| [curl_cffi](https://github.com/lexiforest/curl_cffi)                             | [MIT](https://github.com/lexiforest/curl_cffi/blob/main/LICENSE)                                 |
| [google-generativeai](https://pypi.org/project/google-generativeai/)             | [Apache-2.0](https://github.com/google-gemini/deprecated-generative-ai-python/blob/main/LICENSE) |
