const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User } = require('../models/user');
const { default: mongoose } = require('mongoose');

const mongodbMemoryServer = MongoMemoryServer.create();

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

const createTestingUser = async () => {
  await User.deleteMany({});

  const username = 'root';
  const passwordHash = await bcrypt.hash('secret', 10);

  return new User({ username, passwordHash }).save();
};

module.exports = {
  testingItemsInDB,
  testingUsersInDB,
  createTestingUser,
  getTestingMongodbUri,
  shutdownTestingMongodb,
};
