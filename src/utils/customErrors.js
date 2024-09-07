class HttpError extends Error {
  constructor(status = 500, message) {
    super(message);
    this.status = status;
  }
}
class CustomError extends Error {
  constructor(statusCode = 500, message, details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = { HttpError };
