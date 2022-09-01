module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    if (!this.message) {
      this.message = 'Запись существует.';
    }
    this.statusCode = 409;
  }
};
