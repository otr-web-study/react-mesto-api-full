module.exports = class CommonServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CommonServerError';
    if (!this.message) {
      this.message = 'Внутренняя ошибка сервера.';
    }
    this.statusCode = 500;
  }
};
