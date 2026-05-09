const mongoose = require('mongoose');
const User = require('./models/User');

const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

async function list() {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({});
    console.log('Total users:', users.length);
    users.forEach(u => {
        console.log(`- ${u.email} (${u.role})`);
    });
    process.exit();
}
list();
