const mongoose = require('mongoose') ;


const companySchema = new mongoose.Schema({
  name: String,
  abn: String,
  mobile: String,
  email: String,
  recentWorkPhotos: [String],
  director:[String],
});

const Company = mongoose.model('Company', companySchema);

module.exports =  Company;
