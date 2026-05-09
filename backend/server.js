// Server initialized - Multi-Agent Platform
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
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
    if (!userExists) {
      await User.create(adminData);
      console.log('Admin user auto-created.');
    } else {
      userExists.password = adminData.password;
      await userExists.save();
      console.log('Admin user auto-updated.');
    }
  } catch (err) {
    console.error('Auto-seeding error:', err.message);
  }
};

connectDB().then(() => {
  seedAdmin();
});


const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Multi-Agent Platform API is running...');
});

// Routes
const mainRouter = express.Router();
mainRouter.use('/auth', require('./routes/authRoutes'));
mainRouter.use('/agents', require('./routes/agentRoutes'));
mainRouter.use('/shops', require('./routes/shopRoutes'));

// Mount router on both /api and / for maximum compatibility with Vercel routing
app.use('/api', mainRouter);
app.use('/', mainRouter);


if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

