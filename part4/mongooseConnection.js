const mongoose = require('mongoose');
const { info, error } = require('./utils/logger');
const { getMongoDBUri } = require('./utils/config');

mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    const mongodbUri = await getMongoDBUri();

    info('connecting to', mongodbUri);
    await mongoose.connect(mongodbUri);
    info('connected to MongoDB');
  } catch (err) {
    error('error connecting to MongoDB:', err.message);
  }
};

connect();

module.exports = { mongooseConnection: mongoose.connection };
