const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
