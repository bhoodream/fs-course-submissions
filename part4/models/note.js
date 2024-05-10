const mongoose = require('mongoose');
const { getMongoSchemaOptions } = require('../utils/models');

const schema = new mongoose.Schema(
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

const Note = mongoose.model('Note', schema);

module.exports = { Note };
