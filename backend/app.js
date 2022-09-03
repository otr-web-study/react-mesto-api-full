const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
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
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
