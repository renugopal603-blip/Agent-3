const app = require('../backend/server');

// Debug middleware to log requests in Vercel
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

module.exports = app;

