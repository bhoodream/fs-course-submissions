const mongoose = require('mongoose');
const { getMongoSchemaOptions } = require('../utils/models');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: String,
    url: {
      type: String,
      required: true,
    },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  getMongoSchemaOptions(),
);

const Blog = mongoose.model('Blog', schema);

module.exports = { Blog };
