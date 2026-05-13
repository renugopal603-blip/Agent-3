const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopName: { type: String, required: true },
  businessType: { type: String, enum: ['Service-Based', 'Product-Based'], required: true },
  category: { type: String, required: true }, // e.g., Hotel, Grocery, Furniture
  address: { type: String, required: true },
  district: { type: String, required: true },
  taluk: { type: String, required: true },
  pincode: { type: String, required: true },
  subscriptionPlan: { type: String, enum: ['Basic', 'Standard', 'Premium'], default: 'Basic' },
  trialStartDate: { type: Date, default: Date.now },
  trialEndDate: { type: Date, default: () => new Date(+new Date() + 30*24*60*60*1000) },
  subscriptionStatus: { type: String, enum: ['Trial', 'Active', 'Expired'], default: 'Trial' },
  kycStatus: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
