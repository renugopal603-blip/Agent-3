const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('MongoDB Connected...');

    const adminData = {
      name: 'System Admin',
      email: 'admin@agenticstore.com',
      phone: '9876543210',
      password: 'Admin@123',
      role: 'Admin',
      status: 'Active',
      applicationStatus: 'Approved'
    };

    const userExists = await User.findOne({ phone: adminData.phone });

    if (userExists) {
      console.log('Admin user already exists. Updating password...');
      userExists.password = adminData.password;
      await userExists.save();
      console.log('Admin password updated successfully.');
    } else {
      await User.create(adminData);
      console.log('Admin user created successfully.');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
