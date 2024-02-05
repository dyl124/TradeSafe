// models/Company.js
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';


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

export default Company;
