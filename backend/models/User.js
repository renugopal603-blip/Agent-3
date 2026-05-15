const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Sub-Admin', 'Agent', 'State Agent', 'District Agent', 'Division Agent', 'Pincode Agent', 'Category Agent', 'Shop Owner', 'User', 'Delivery Partner'],
    default: 'User'
  },
  membershipId: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipSubscription' },
  walletBalance: { type: Number, default: 0 },
  address: {
    street: String,
    city: String,
    district: String,
    state: String,
    pincode: String
  },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: String },
  // Agent Application Specific Fields
  agentType: { type: String, enum: ['State Agent', 'District Agent', 'Divisional Agent', 'Pincode Agent'] },
  territory: {
    state: String,
    district: String,
    division: String,
    pincode: String
  },
  kycDocuments: {
    identityProofType: String,
    aadharFront: String,
    aadharBack: String,
    panCard: String,
    photo: String,
    addressProof: String,
    bankPassbook: String
  },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },
  paymentDetails: {
    transactionId: String,
    paymentProof: String,
    amount: Number,
    date: Date
  },
  applicationStatus: { 
    type: String, 
    enum: ['Not Applied', 'Pending Review', 'Under Review', 'Verified', 'Approved', 'Rejected', 'Request Correction'], 
    default: 'Not Applied' 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Suspended', 'Pending', 'Under Review', 'Verified', 'Approved', 'Rejected'], 
    default: 'Inactive' 
  },
  // Audit & Notifications
  auditLogs: [{
    action: String,
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: String,
    timestamp: { type: Date, default: Date.now }
  }],
  notifications: [{
    title: String,
    message: String,
    type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
    read: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  }],
  // Sub-Admin Specific Fields
  employeeId: { type: String },
  accessLevel: { type: String },
  assignedLocation: { type: String },
  permissions: {
    manageAgents: { type: Boolean, default: false },
    manageShops: { type: Boolean, default: false },
    viewAnalytics: { type: Boolean, default: false },
    approveKYC: { type: Boolean, default: false },
    manageAreas: { type: Boolean, default: false },
    communication: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }

});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
