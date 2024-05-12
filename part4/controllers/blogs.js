const { Blog } = require('../models/blog');
const { initResourceController } = require('../utils/controllers');
const blogsRouter = require('express').Router();

initResourceController(blogsRouter)({
  resource: 'blogs',
  Model: Blog,
  createValidate: async (body) => {
    const blogs = await Blog.find({});

    return blogs.some((b) => b.title === body.title)
      ? `blog with title (${body.title}) already exists`
      : '';
  },
  updateValidate: async (body) => {
    const blogs = await Blog.find({});

    return !blogs.some((b) => b.title === body.title)
      ? `blog with title (${body.title}) not exists`
      : '';
  },
  initialData: (body) => ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }),
});

module.exports = { blogsRouter };
