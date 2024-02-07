// models/Discrepancy.js
const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const bcrypt = require('bcrypt') ;


const discrepancySchema = new mongoose.Schema({
 
  dateOfWorks: String,
  dateOfSubmission: {
    type: Date,
    default: Date.now,
  },
  complaints: String,
  photosOfWork: [String],
  scopeOfWorks: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  posting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posting',
  },
});

const Discrepancy = mongoose.model('Discrepancy', discrepancySchema);

module.exports = Discrepancy