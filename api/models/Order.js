const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ['Product', 'Service'], required: true },
    name: String,
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  orderType: { type: String, enum: ['Delivery', 'Pickup', 'Service Appointment'], required: true },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  deliveryAddress: {
    street: String,
    city: String,
    pincode: String,
    phone: String
  },
  deliveryPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted', 'Preparing', 'Picked Up', 'Out for Delivery', 'Delivered', 'Cancelled', 'Refunded'],
    default: 'Pending' 
  },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  razorpayOrderId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
