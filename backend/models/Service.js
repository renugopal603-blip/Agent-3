const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  description: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
