const mongoose = require('mongoose') ;
const { Schema } = mongoose;
const bcrypt = require('bcrypt') ;


const companySchema = new mongoose.Schema({
  name: String,
  abn: String,
  mobile: String,
  email: String,
  userName: String,
  password: String,
  recentWorkPhotos: [String],
});

const Company = mongoose.model('Company', companySchema);

module.exports =  Company;
