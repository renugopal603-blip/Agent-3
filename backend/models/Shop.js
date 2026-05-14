const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String, required: true },
  agent: { type: String, required: true },
  sales: { type: String, default: '₹0' },
  status: { 
    type: String, 
    enum: ['Pending', 'Under Review', 'Verified', 'Approved', 'Rejected', 'Active', 'Inactive'], 
    default: 'Pending' 
  },
  rating: { type: String, default: 'N/A' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) },
  documents: {
    license: { type: String },
    gst: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
