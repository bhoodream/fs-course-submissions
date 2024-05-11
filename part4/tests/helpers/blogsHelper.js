const { Blog } = require('../../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'fs-open',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    likes: 0,
  },
  {
    title: 'JS is note easy',
    author: 'Vadim',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    likes: 15,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
