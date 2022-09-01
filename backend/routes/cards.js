const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');
const {
  ruleCreateCard,
  ruleParamsContainsCardId,
} = require('../validators/cards');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getCards);
router.post('/', celebrate(ruleCreateCard), createCard);
router.delete('/:cardId', celebrate(ruleParamsContainsCardId), deleteCard);
router.put('/:cardId/likes', celebrate(ruleParamsContainsCardId), likeCard);
router.delete('/:cardId/likes', celebrate(ruleParamsContainsCardId), unlikeCard);

module.exports = router;
