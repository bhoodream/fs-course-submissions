const { getTestingMongodbUri, createRootUser } = require('../tests/helpers');
const { info } = require('./logger');

const getMongoDBUri = async () => {
  if (['test', 'development'].includes(process.env.NODE_ENV))
    return getTestingMongodbUri();

  return process.env.MONGODB_URI;
};

const afterCreateConnection = async () => {
  if (['test', 'development'].includes(process.env.NODE_ENV)) {
    await createRootUser();
    info('created testing user to MongoDB');
  }
};

module.exports = {
  getMongoDBUri,
  afterCreateConnection,
};
