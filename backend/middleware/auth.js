const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Exit if DB fails to connect
  }
};

module.exports = connectDB;