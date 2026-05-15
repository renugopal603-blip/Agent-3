const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

dotenv.config({ path: path.join(__dirname, '../../.env') });

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

async function list() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 });
        const users = await User.find({});
        console.log('Total users:', users.length);
        users.forEach(u => {
            console.log(`- Phone: ${u.phone} | Role: ${u.role} | Email: ${u.email}`);
        });
        process.exit();
    } catch (err) {
        console.error('Error listing users:', err.message);
        process.exit(1);
    }
}
list();
