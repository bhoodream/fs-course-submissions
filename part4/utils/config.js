const { getTestingMongodbUri } = require('../tests/helpers');

const getMongoDBUri = async () => {
  if (process.env.NODE_ENV === 'test') return getTestingMongodbUri();

  return process.env.MONGODB_URI;
};

module.exports = {
  getMongoDBUri,
};
