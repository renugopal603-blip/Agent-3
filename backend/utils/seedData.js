const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const MembershipPlan = require('../models/MembershipPlan');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const plans = [
  {
    name: 'Basic',
    price: 5000,
    benefits: ['Local Shop Discounts', 'Standard Support', '5% Wallet Cashback', 'Basic Member Badge'],
    isPopular: false,
    accessLevel: 1
  },
  {
    name: 'Silver',
    price: 10000,
    benefits: ['10% Local Discounts', 'Priority Support', '8% Wallet Cashback', 'Silver Member Badge', 'Free Delivery (5km)'],
    isPopular: false,
    accessLevel: 2
  },
  {
    name: 'Gold',
    price: 15000,
    benefits: ['15% Local Discounts', '24/7 Priority Support', '10% Wallet Cashback', 'Gold Member Badge', 'Unlimited Free Delivery', 'Exclusive Events'],
    isPopular: true,
    accessLevel: 3
  },
  {
    name: 'Platinum',
    price: 50000,
    benefits: ['25% Local Discounts', 'Dedicated Account Manager', '15% Wallet Cashback', 'Platinum Member Badge', 'Airport Lounge Access', 'VIP Local Concierge'],
    isPopular: false,
    accessLevel: 4
  },
  {
    name: 'Diamond',
    price: 100000,
    benefits: ['40% Local Discounts', 'Personal Lifestyle Agent', '25% Wallet Cashback', 'Diamond VIP Badge', 'Global Concierge', 'Luxury Gift Box Yearly'],
    isPopular: false,
    accessLevel: 5
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multi-agent-platform');

    // Clear existing data
    // Clear existing data and drop indexes
    try {
      await User.collection.drop();
      console.log('User collection dropped');
    } catch (e) {
      console.log('User collection does not exist, skipping drop');
    }
    await MembershipPlan.deleteMany();

    // Create Membership Plans
    await MembershipPlan.insertMany(plans);
    console.log('Membership plans seeded');

    // Create Default Admin
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@premium.com',
      phone: '9999999999',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'Admin',
      status: 'Active'
    });

    await admin.save();
    console.log('Admin user created');

    // Create sample users for other roles
    const roles = ['State Agent', 'District Agent', 'Pincode Agent'];
    for (const role of roles) {
      const user = new User({
        name: `${role} Test`,
        email: `${role.toLowerCase().replace(' ', '')}@test.com`,
        phone: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
        password: 'password123',
        role: role,
        status: 'Active'
      });
      await user.save();
    }
    console.log('Sample users seeded');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
