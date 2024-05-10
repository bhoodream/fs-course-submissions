const mongooseConnection = require('mongoose');

mongooseConnection.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongooseConnection
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

module.exports = mongooseConnection;
