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
  applicationStatus: { type: String, enum: ['Not Applied', 'Pending Review', 'Approved', 'Rejected', 'Request Correction'], default: 'Not Applied' },
  status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], default: 'Inactive' }, // Default to Inactive for new registrations
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  console.log('Hashing password for user:', this.email);
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
