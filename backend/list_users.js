const mongoose = require('mongoose');
const User = require('./models/User');

async function list() {
    await mongoose.connect('mongodb://localhost:27017/multi-agent-platform');
    const users = await User.find({});
    console.log('Total users:', users.length);
    users.forEach(u => {
        console.log(`- ${u.email} (${u.role})`);
    });
    process.exit();
}
list();
