const mongoose = require('mongoose');
const { Schema } = mongoose;

const postingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  priceRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  creator:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Posting = mongoose.model('Posting', postingSchema);

module.exports = Posting;
