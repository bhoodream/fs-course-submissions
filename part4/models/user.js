const mongoose = require('mongoose');
const { getMongoSchemaOptions } = require('../utils/models');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    passwordHash: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  getMongoSchemaOptions({
    toJSON: {
      transform: (document, returnedObject) =>
        delete returnedObject.passwordHash,
    },
  }),
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
