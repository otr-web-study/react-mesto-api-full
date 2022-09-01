const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');
const ObjectNotFoundError = require('./errors/ObjectNotFoundError');
const centralizedErrorHandling = require('./middlewares/centralizedErrorHandling');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT } = require('./settings/constants');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log(err));

app.use(requestLogger);
app.use(cors);
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', authRouter);
app.all('*', (req, res, next) => {
  next(new ObjectNotFoundError('Несуществующий путь.'));
});

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`App listening on port ${PORT}`);
});
