const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const connect = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    mongoose.connection.on('error', () => {
      process.exit();
    });
  } catch (err) {
    console.error(err.message);
    throw new Error('Could not connect to the database');
  }
};

module.exports = {
  connect,
};
