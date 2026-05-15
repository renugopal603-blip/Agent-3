const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: [String],
  validity: { type: Number, default: 365 }, // in days
  accessLevel: { type: Number, default: 1 },
  isPopular: { type: Boolean, default: false }
});

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);
