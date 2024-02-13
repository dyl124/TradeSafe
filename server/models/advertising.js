// models/Advertising.js
const mongoose = require('mongoose') ;


const advertisingSchema = new mongoose.Schema({
  photos: [String],
  title: String,
  captions: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  creator:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Advertising = mongoose.model('Advertising', advertisingSchema);

module.exports = Advertising;
