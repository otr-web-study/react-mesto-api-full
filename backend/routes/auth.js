const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  ruleCreateUser,
  ruleLogin,
} = require('../validators/users');

router.post('/signin', celebrate(ruleLogin), login);
router.post('/signup', celebrate(ruleCreateUser), createUser);

module.exports = router;
