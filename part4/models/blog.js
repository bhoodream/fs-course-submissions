const mongoose = require('mongoose');
const { getMongoSchemaOptions } = require('../utils/models');

const schema = new mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  getMongoSchemaOptions(),
);

const Blog = mongoose.model('Blog', schema);

module.exports = { Blog };
