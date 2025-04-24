const { MongoMemoryServer } = require('mongodb-memory-server');
const { User } = require('../models/user');
const { default: mongoose } = require('mongoose');
const { generatePasswordHash } = require('../utils/auth');

const mongodbMemoryServer = MongoMemoryServer.create({
  replSet: { count: 1 },
});

const testingItemsInDB = async (Model) => {
  const items = await Model.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  return items.map((i) => i.toJSON());
};

const testingUsersInDB = async () => {
  const items = await User.find({});
  return items.map((i) => i.toJSON());
};

const shutdownTestingMongodb = async () => {
  await mongoose.connection.close();
  (await mongodbMemoryServer).stop();
};

const getTestingMongodbUri = async () => {
  return (await mongodbMemoryServer).getUri();
};

const createRootUser = async () => {
  await User.deleteMany({});

  const username = 'root';
  const passwordHash = await generatePasswordHash('root');

  return new User({ username, name: 'Root User', passwordHash }).save();
};

module.exports = {
  testingItemsInDB,
  testingUsersInDB,
  createRootUser,
  getTestingMongodbUri,
  shutdownTestingMongodb,
};
