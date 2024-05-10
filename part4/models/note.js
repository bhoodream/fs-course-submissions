const mongooseConnection = require('../mongooseConnection');
const { getMongoSchemaOptions } = require('../utils/models');

const schema = new mongooseConnection.Schema(
  {
    content: {
      type: String,
      minLength: 5,
      required: true,
    },
    important: Boolean,
  },
  getMongoSchemaOptions(),
);

module.exports = mongooseConnection.model('Note', schema);
