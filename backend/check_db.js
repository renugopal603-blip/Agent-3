const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function check() {
    await mongoose.connect('mongodb://localhost:27017/multi-agent-platform');
    const user = await User.findOne({ email: 'admin@premium.com' });
    if (!user) {
        console.log('NOT_FOUND');
    } else {
        console.log('HASH_IN_DB:', user.password);
        const match = await bcrypt.compare('admin123', user.password);
        console.log('MATCH:', match);
    }
    process.exit();
}
check();
