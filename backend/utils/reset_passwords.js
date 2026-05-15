const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../../.env') });

async function reset() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { family: 4 });
        console.log('Connected to DB');

        const users = [
            { phone: '9876543210', password: 'Admin@123' },
            { phone: '9361565457', password: 'Subadmin@123' },
            { phone: '1111111111', password: '123456' },
            { phone: '8778942170', password: '8778942170' }
        ];

        for (const u of users) {
            const user = await User.findOne({ phone: u.phone });
            if (user) {
                user.password = u.password;
                await user.save();
                console.log(`Password reset for ${u.phone}`);
            } else {
                console.log(`User not found: ${u.phone}`);
            }
        }
        process.exit();
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}
reset();
