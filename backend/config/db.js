const mongoose = require('mongoose');
const dns = require('dns');

// Fix for ECONNREFUSED on querySrv in some environments
try {
  // Use Cloudflare and Google DNS
  dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Could not set custom DNS servers:', e.message);
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/multi-agent-platform', {
      family: 4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit process, allow server to run for static routes or demo mode
  }
};


module.exports = connectDB;
