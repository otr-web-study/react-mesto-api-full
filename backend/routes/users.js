const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  ruleUpdateUser,
  ruleUpdateAvatar,
  ruleParamsContainsUserId,
} = require('../validators/users');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(ruleParamsContainsUserId), getUser);
router.patch('/me', celebrate(ruleUpdateUser), updateUser);
router.patch('/me/avatar', celebrate(ruleUpdateAvatar), updateAvatar);

module.exports = router;
