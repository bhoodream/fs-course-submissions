const mongooseConnection = require('../mongooseConnection');
const { getMongoSchemaOptions } = require('../utils/models');

const schema = new mongooseConnection.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    phone: {
      type: String,
      minLength: 8,
      validate: {
        validator: (v) => /^\d{2,3}-\d+$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: true,
    },
  },
  getMongoSchemaOptions(),
);

const Person = mongooseConnection.model('Person', schema);

module.exports = Person;
