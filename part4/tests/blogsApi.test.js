const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const { app } = require('../app');
const { Blog } = require('../models/blog');
const {
  createTestingUser,
  testingUsersInDB,
  shutdownTestingMongodb,
  testingItemsInDB,
} = require('./helpers');
const { pick } = require('lodash');
const { generateAuthToken } = require('../utils/auth');

const api = supertest(app);

beforeEach(async () => {
  await createTestingUser();
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
    const [user] = await testingUsersInDB();
    const newBlogData = {
      title: 'new blog',
      author: 'me',
      url: 'no',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', generateAuthToken(user.id))
      .send({ ...newBlogData, userId: user.id })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await blogsInDB();
    const lastCreatedBlog = finalBlogs.slice(-1)[0];
    const expectBlog = {
      ...newBlogData,
      id: lastCreatedBlog.id,
      user: pick(user, ['username', 'id']),
      likes: 0,
    };

    assert(finalBlogs.length === INITIAL_BLOGS.length + 1);
    assert.deepStrictEqual(lastCreatedBlog, expectBlog);
  });

  test('blogs is handle bad creating data', async () => {
    const [user] = await testingUsersInDB();

    await api
      .post('/api/blogs')
      .set('Authorization', generateAuthToken(user.id))
      .send({ author: 'Vadim', likes: 1234, userId: user.id })
      .expect(400);
  });

  test('blogs is deleting', async () => {
    const [blog] = await blogsInDB();

    await api.delete(`/api/blogs/${blog.id}`).expect(204);
    const finalBlogs = await blogsInDB();

    assert(!finalBlogs.map((b) => b.title).includes(blog.title));
    assert.strictEqual(finalBlogs.length, INITIAL_BLOGS.length - 1);
  });

  test('blogs is updating', async () => {
    const [blog] = await blogsInDB();
    const newAuthor = 'updated blog';

    await api
      .put(`/api/blogs/${blog.id}`)
      .send({ ...blog, author: newAuthor })
      .expect(200);
    const finalBlogs = await blogsInDB();

    assert(finalBlogs.map((b) => b.author).includes(newAuthor));
  });
});

after(shutdownTestingMongodb);

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

const blogsInDB = () => testingItemsInDB(Blog);
