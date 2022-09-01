const { handleError } = require('../utils/utils');

module.exports = (err, req, res, next) => {
  const { statusCode, message } = handleError(err);

  res.status(statusCode).send({
    message: `Произошла ошибка: ${message}`,
  });
  next();
};
