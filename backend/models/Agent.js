const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentType: { 
    type: String, 
    enum: ['State Agent', 'District Agent', 'Division Agent', 'Pincode Agent', 'Category Agent'],
    required: true 
  },
  assignedState: { type: String },
  assignedDistrict: { type: String },
  assignedTaluk: { type: String },
  assignedPincode: { type: String },
  category: { type: String },
  kycStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected', 'Resubmit Required'], default: 'Pending' },
  depositStatus: { type: String, enum: ['Pending', 'Paid', 'Refunded'], default: 'Pending' },
  performanceScore: { type: Number, default: 0 },
  targets: [{
    month: String,
    target: Number,
    achieved: { type: Number, default: 0 }
  }],
  earnings: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agent', agentSchema);
