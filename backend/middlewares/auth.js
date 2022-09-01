const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { secret } = require('../settings/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Требуется авторизация.');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch (err) {
    throw new AuthError('Ошибочный jwt-токен.');
  }

  req.user = payload;
  next();
};
