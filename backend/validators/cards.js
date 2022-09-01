const { Joi } = require('celebrate');
const { isValidObjectId } = require('mongoose');
const { urlPattern } = require('../settings/constants');
const ValidationError = require('../errors/ValidationError');

module.exports.ruleCreateCard = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
};

module.exports.ruleParamsContainsCardId = {
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value) => {
      if (!isValidObjectId(value)) {
        throw new ValidationError('Некорректный id.');
      }
      return value;
    }),
  }),
};
