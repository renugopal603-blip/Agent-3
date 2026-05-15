const mongoose = require('mongoose');
const User = require('./models/User');

async function seedSubAdmin() {
    await mongoose.connect('mongodb://localhost:27017/multi-agent-platform');
    const email = 'subadmin@premium.com';
    const password = 'subadmin123';
    
    let user = await User.findOne({ email });
    if (!user) {
        console.log("Sub-Admin not found, creating...");
        user = new User({
            name: 'State Sub-Admin',
            email: email,
            phone: '8888888888',
            password: password,
            role: 'Sub-Admin',
            status: 'Active'
        });
        await user.save();
        console.log("Sub-Admin created.");
    } else {
        console.log("Sub-Admin found. Updating password to 'subadmin123'...");
        user.password = password;
        await user.save();
        console.log("Password updated.");
    }

    process.exit();
}

seedSubAdmin();
