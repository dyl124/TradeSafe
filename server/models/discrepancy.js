const mongoose = require('mongoose');

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
  user:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

});

const Discrepancy = mongoose.model('Discrepancy', discrepancySchema);

module.exports = Discrepancy;
