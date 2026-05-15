const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userType: { type: String, enum: ['Agent', 'Shop', 'Delivery Partner'], required: true },
  aadhaar: { type: String, required: true },
  pan: { type: String, required: true },
  businessProof: { type: String }, // File path
  addressProof: { type: String }, // File path
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    ifsc: String,
    bankName: String
  },
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected', 'Resubmit Required'], default: 'Pending' },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('KYC', kycSchema);
