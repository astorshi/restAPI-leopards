const { model } = require('mongoose');

const Good = model('Good', {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
});

module.exports = Good;
