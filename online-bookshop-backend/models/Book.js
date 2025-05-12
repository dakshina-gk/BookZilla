const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number,
  thumbnail: String
});

module.exports = mongoose.model('Book', BookSchema);
