#Copyright (C) 2023 ading2210
#see README.md for more information

class UnauthorizedError(Exception):
  status_code = 401

class ForbiddenError(Exception):
  status_code = 403

class BadRequestError(Exception):
  status_code = 400

class BadGatewayError(Exception):
  status_code = 502

class ServiceUnavailableException(Exception):
  status_code = 503

class NetworkTimeoutError(Exception):
  status_code = 504
  recovery_hint = "Connection timed out. Check your internet connection and try again."

class RateLimitError(Exception):
  status_code = 429
  recovery_hint = "Too many requests. Please wait a moment and try again."

class ValidationError(Exception):
  status_code = 400
  recovery_hint = "Invalid request parameters. Check your input and try again."

class CaptionError(Exception):
  status_code = 403
  recovery_hint = "Video captions are private or unavailable."