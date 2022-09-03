const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const authRouter = require('./auth');
const ObjectNotFoundError = require('../errors/ObjectNotFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/', authRouter);
router.all('*', (req, res, next) => {
  next(new ObjectNotFoundError('Несуществующий путь.'));
});

module.exports = router;
