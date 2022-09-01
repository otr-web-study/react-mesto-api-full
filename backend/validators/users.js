const { Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { urlPattern } = require('../settings/constants');
const ValidationError = require('../errors/ValidationError');

module.exports.ruleCreateUser = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports.ruleUpdateUser = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

module.exports.ruleUpdateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
};

module.exports.ruleParamsContainsUserId = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ValidationError('Некорректный id.');
      }
      return value;
    }),
  }),
};

module.exports.ruleLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};
