module.exports = class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    if (!this.message) {
      this.message = 'Неправильный email или пароль.';
    }
    this.statusCode = 401;
  }
};
