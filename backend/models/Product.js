const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 0 },
  images: [String],
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
