const ObjectNotFoundError = require('../errors/ObjectNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const CommonServerError = require('../errors/CommonServerError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const handleObjectNotFound = (obj, isAuth = false) => {
  if (!obj) {
    throw isAuth ? new AuthError() : new ObjectNotFoundError();
  }
  return obj;
};

const handleError = (err) => {
  if (err.statusCode) {
    return err;
  }

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new ValidationError();
  }

  if (err.code === 11000) {
    return new ConflictError();
  }

  return new CommonServerError();
};

const isCurrentUserOwner = (req, obj) => {
  if (obj.owner._id.toString() !== req.user._id) {
    throw new ForbiddenError();
  }
  return obj;
};

module.exports = {
  handleObjectNotFound,
  handleError,
  isCurrentUserOwner,
};
