// models/Posting.js
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

const { Schema } = mongoose;

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

export default Posting;
