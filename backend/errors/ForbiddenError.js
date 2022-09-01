module.exports = class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    if (!this.message) {
      this.message = 'Недостаточно прав для выполнения действия.';
    }
    this.statusCode = 403;
  }
};
