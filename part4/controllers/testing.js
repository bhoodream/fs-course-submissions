const router = require('express').Router();
const { Blog } = require('../models/blog');

router.post('/reset-blogs', async (request, response) => {
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = router;
