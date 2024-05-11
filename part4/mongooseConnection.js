const mongooseConnection = require('mongoose');
const { info, error } = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');

mongooseConnection.set('strictQuery', false);

info('connecting to', MONGODB_URI);

const connect = async () => {
  try {
    await mongooseConnection.connect(MONGODB_URI);
    info('connected to MongoDB');
  } catch (err) {
    error('error connecting to MongoDB:', err.message);
  }
};

connect();

module.exports = { mongooseConnection };
