const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const bcrypt = require('bcrypt') ;

const postingSchema = new Schema({
 
  title: String,
  caption: String,
  photos: [String],
  priceRange: {
    min: Number,
    max: Number,
  },
});

const Posting = mongoose.model('Posting', postingSchema);

module.exports =  Posting;
