const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { app } = require('../app');
const { Blog } = require('../models/blog');
const { resourceItemsInDB } = require('./helpers');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(INITIAL_BLOGS.map((blog) => new Blog(blog).save()));
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

    assert.strictEqual(response.body.length, INITIAL_BLOGS.length);
  });

  test('blogs content is correct', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((e) => e.title);

    assert(INITIAL_BLOGS.every((b) => titles.includes(b.title)));
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

    await api
      .post('/api/blogs')
      .send(newBlogData)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await blogsInDb();
    const lastCreatedBlog = finalBlogs.slice(-1)[0];

    assert(finalBlogs.length === INITIAL_BLOGS.length + 1);
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

  test('blogs is deleting', async () => {
    const [blog] = await blogsInDb();

    await api.delete(`/api/blogs/${blog.id}`).expect(204);
    const finalBlogs = await blogsInDb();

    assert(!finalBlogs.map((b) => b.title).includes(blog.title));
    assert.strictEqual(finalBlogs.length, INITIAL_BLOGS.length - 1);
  });

  test('blogs is updating', async () => {
    const [blog] = await blogsInDb();
    const newAuthor = 'updated blog';

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ ...blog, author: newAuthor })
      .expect(200);
    const finalBlogs = await blogsInDb();

    assert(finalBlogs.map((b) => b.author).includes(newAuthor));
  });
});

after(async () => {
  await mongoose.connection.close();
});

const INITIAL_BLOGS = [
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

const blogsInDb = () => resourceItemsInDB(Blog);
