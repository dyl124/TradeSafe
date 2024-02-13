const mongoose = require('mongoose') ;


const companySchema = new mongoose.Schema({
  name: String,
  abn: String,
  mobile: String,
  email: String,
  recentWorkPhotos: [String],
  director:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Company = mongoose.model('Company', companySchema);

module.exports =  Company;
