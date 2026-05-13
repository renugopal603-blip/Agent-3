const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);

const dns = require('dns');

// Fix for ECONNREFUSED on querySrv in some environments
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e.message);
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/multi-agent-platform';
    
    const conn = await mongoose.connect(mongoUri, {
      family: 4,
      serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if DB is not reachable
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    console.warn('The application is running without a database connection. Some features will be unavailable.');
    
    // Disable buffering so that queries fail immediately instead of hanging
    mongoose.set('bufferCommands', false);
    
    return false;
  }
};


module.exports = connectDB;
