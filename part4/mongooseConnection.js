const mongooseConnection = require('mongoose');
const { info } = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');

mongooseConnection.set('strictQuery', false);

info('connecting to', MONGODB_URI);

const connect = async () => {
  try {
    await mongooseConnection.connect(MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message);
  }
};

connect();

module.exports = { mongooseConnection };
