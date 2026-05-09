const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

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

module.exports = app;
