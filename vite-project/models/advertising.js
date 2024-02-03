// models/Advertising.js
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';


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

export default Advertising;
