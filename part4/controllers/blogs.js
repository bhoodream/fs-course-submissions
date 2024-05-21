const { Blog } = require('../models/blog');
const { expressAuthMiddleware } = require('../utils/auth');
const { initResourceController, authError } = require('../utils/controllers');
const blogsRouter = require('express').Router();

initResourceController(blogsRouter)({
  Model: Blog,
  createValidate: async (body) => {
    const blogs = await Blog.find({});

    return blogs.some((b) => b.title === body.title)
      ? `blog with title (${body.title}) already exists`
      : '';
  },
  updateValidate: (body) => updateValidate(body),
  initialData: (body) => ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }),
});

blogsRouter.put(
  '/:id/like',
  expressAuthMiddleware(),
  async (request, response) => {
    if (!request.auth.userId) return authError(response);

    const blog = await Blog.findById(request.params.id);

    if (!blog) return response.status(400).json({ error: 'unknown blog' });

    const updatedItem = await Blog.findByIdAndUpdate(
      blog._id,
      { likes: (blog.likes || 0) + 1 },
      { new: true, runValidators: true, context: 'query' },
    );

    response.json(updatedItem);
  },
);

const updateValidate = async (body) => {
  const blogs = await Blog.find({});

  return !blogs.some((b) => b.title === body.title)
    ? `blog with title (${body.title}) not exists`
    : '';
};

module.exports = { blogsRouter };
