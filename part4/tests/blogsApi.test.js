const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('../app');
const { Blog } = require('../models/blog');
const { initialBlogs } = require('./helpers/blogsHelper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(initialBlogs.map((blog) => new Blog(blog).save()));
});

describe('blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs');

    assert.strictEqual(response.body.length, initialBlogs.length);
  });

  test('blogs content is correct', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((e) => e.title);

    assert(initialBlogs.every((b) => titles.includes(b.title)));
  });

  test('blogs ids is correct', async () => {
    const response = await api.get('/api/blogs');

    assert(response.body.every((b) => typeof b.id === 'string'));
  });

  test('blogs is creating', async () => {
    const newBlogData = {
      title: 'new blog',
      author: 'me',
      url: 'no',
    };

    await api.post('/api/blogs').send(newBlogData);

    const response = await api.get('/api/blogs');
    const lastCreatedBlog = response.body.slice(-1)[0];

    assert(response.body.length === initialBlogs.length + 1);
    assert.deepStrictEqual(lastCreatedBlog, {
      ...newBlogData,
      id: lastCreatedBlog.id,
      likes: 0,
    });
  });

  test('blogs is handle bad creating data', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Vadim', likes: 1234 })
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
