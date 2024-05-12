const { test, beforeEach, describe, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const { app } = require('../app');

const {
  createTestingUser,
  testingUsersInDB,
  shutdownTestingMongodb,
} = require('./helpers');

const api = supertest(app);

beforeEach(createTestingUser);

describe('users', () => {
  test('smoke', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, 1);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await testingUsersInDB();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testingUsersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

after(shutdownTestingMongodb);
