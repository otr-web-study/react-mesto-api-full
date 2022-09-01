const Card = require('../models/card');
const { handleObjectNotFound, isCurrentUserOwner } = require('../utils/utils');

const updateCard = (res, cardId, data) => Card.findByIdAndUpdate(cardId, data, {
  new: true, runValidators: true,
})
  .then(handleObjectNotFound)
  .then((card) => card.populate(['owner', { path: 'likes' }]))
  .then((card) => res.send(card));

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', { path: 'likes' }])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => card.populate(['owner', { path: 'likes' }]))
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(handleObjectNotFound)
    .then((card) => isCurrentUserOwner(req, card))
    .then((card) => card.remove())
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  updateCard(res, cardId, { $addToSet: { likes: req.user._id } })
    .catch(next);
};

module.exports.unlikeCard = (req, res, next) => {
  const { cardId } = req.params;

  updateCard(res, cardId, { $pull: { likes: req.user._id } })
    .catch(next);
};
