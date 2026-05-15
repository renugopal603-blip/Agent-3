const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log('MongoDB Connected...');

    const userData = {
      name: 'Demo Agent',
      email: 'demo@agenticstore.com',
      phone: '9877855876',
      password: 'Agent@123',
      role: 'Agent',
      status: 'Active',
      applicationStatus: 'Approved'
    };

    const userExists = await User.findOne({ phone: userData.phone });

    if (userExists) {
      console.log('User already exists. Updating details and status to Active/Approved...');
      userExists.password = userData.password;
      userExists.status = 'Active';
      userExists.applicationStatus = 'Approved';
      userExists.role = 'Agent';
      await userExists.save();
      console.log('User updated successfully.');
    } else {
      await User.create(userData);
      console.log('User created successfully.');
    }

    console.log('\n--- Credentials for Localhost ---');
    console.log(`Phone: ${userData.phone}`);
    console.log(`Password: ${userData.password}`);
    console.log('Status: Active');
    console.log('Application Status: Approved');
    console.log('---------------------------------\n');

    process.exit();
  } catch (error) {
    console.error('Error seeding user:', error.message);
    process.exit(1);
  }
};

seedUser();
