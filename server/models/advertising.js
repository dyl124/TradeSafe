// models/Advertising.js
const mongoose = require('mongoose') ;
const bcrypt = require('bcrypt') ;


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
});

const Advertising = mongoose.model('Advertising', advertisingSchema);

module.exports = Advertising;
