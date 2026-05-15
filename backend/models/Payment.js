const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  purpose: { type: String, enum: ['Membership', 'Deposit', 'Subscription', 'Order'], required: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['Created', 'Captured', 'Failed'], default: 'Created' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);
