const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    const usersToSeed = [
      {
        name: 'System Admin',
        email: 'admin@agenticstore.com',
        phone: '9876543210',
        password: 'Admin@123',
        role: 'Admin',
        status: 'Active',
        applicationStatus: 'Approved'
      },
      {
        name: 'Demo Sub-Admin',
        email: 'subadmin@agenticstore.com',
        phone: '9361565457',
        password: 'Subadmin@123',
        role: 'Sub-Admin',
        status: 'Active',
        applicationStatus: 'Approved'
      },
      {
        name: 'Demo Agent',
        email: 'agent@agenticstore.com',
        phone: '8778942170',
        password: 'Agent@123',
        role: 'Agent',
        status: 'Active',
        applicationStatus: 'Approved'
      }
    ];

    for (const userData of usersToSeed) {
      const userExists = await User.findOne({ phone: userData.phone });
      if (!userExists) {
        await User.create(userData);
        console.log(`${userData.role} user auto-created: ${userData.phone}`);
      } else {
        userExists.password = userData.password;
        await userExists.save();
        console.log(`${userData.role} user auto-updated: ${userData.phone}`);
      }
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

// Debug middleware
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is reachable', url: req.url });
});

// Routes
const mainRouter = express.Router();
mainRouter.use('/auth', require('./routes/authRoutes'));
mainRouter.use('/agents', require('./routes/agentRoutes'));
mainRouter.use('/shops', require('./routes/shopRoutes'));

// Mount router on both /api and / for maximum compatibility with Vercel routing
app.use('/api', mainRouter);
app.use('/', mainRouter);

// Serve static files from frontend/dist (for non-Vercel deployments like Render)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// SPA Fallback: serve index.html for any unknown routes (except API)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
});

// Explicit export for Vercel serverless environment
module.exports = (req, res) => {
  return app(req, res);
};


