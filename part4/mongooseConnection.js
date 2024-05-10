const mongooseConnection = require('mongoose');
const { info } = require('./utils/logger');
const { MONGODB_URI } = require('./utils/config');

mongooseConnection.set('strictQuery', false);

info('connecting to', MONGODB_URI);

mongooseConnection
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

module.exports = { mongooseConnection };
