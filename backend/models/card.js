const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    minlength: [2, 'Минимальная длина значения: 2'],
    maxlength: [30, 'Максимальная длина значения: 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно к заполнению.'],
    validate: [isURL, 'Некорректный url.'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
