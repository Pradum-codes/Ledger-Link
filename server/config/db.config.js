const mongoose = require('mongoose');

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;
// eslint-disable-next-line no-undef
const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    console.log("Mongo DB connection Initiated------------------");
    console.log(MONGO_DB);
    const conn = await mongoose.connect(`${MONGO_URI}/${MONGO_DB}`);
    console.log(`------------MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`------------DB connection error: ${err.message}`);
    // Exit the app if DB connection fails
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
