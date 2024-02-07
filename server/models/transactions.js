const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  item: {
    name: { type: String, required: true },
    description: String,
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    currency: { type: String, default: 'AUD' },
  },
  transactionDateTime: { type: Date, default: Date.now },
  transactionStatus: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
  },
  payment: {
    method: String,
    amount: Number,
    currency: { type: String, default: 'AUD' },
  },
  shipping: {
    address: String,
  },
  additionalNotes: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
