const { test, beforeEach, describe, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const { app } = require('../app');

const {
  createRootUser,
  testingUsersInDB,
  shutdownTestingMongodb,
} = require('./helpers');

const api = supertest(app);

beforeEach(createRootUser);

describe('users', () => {
  test('smoke', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, 1);
  });

  test('bad data', async () => {
    const usersAtStart = await testingUsersInDB();

    const newUser = {
      username: '12',
      name: 'Matti Luukkainen',
      password: '21',
    };

    const { body } = await api.post('/api/users').send(newUser).expect(400);

    assert.strictEqual(body.error, 'bad password');

    const usersAtEnd = await testingUsersInDB();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(!usernames.includes(newUser.username));
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
