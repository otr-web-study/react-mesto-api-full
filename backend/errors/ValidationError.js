module.exports = class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    if (!this.message) {
      this.message = 'Validation error.';
    }
    this.statusCode = 400;
  }
};
