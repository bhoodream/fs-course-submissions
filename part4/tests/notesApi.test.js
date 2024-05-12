const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const { app } = require('../app');
const { Note } = require('../models/note');
const {
  createTestingUser,
  testingUsersInDB,
  shutdownTestingMongodb,
  testingItemsInDB,
} = require('./helpers');
const { generateAuthToken } = require('../utils/auth');

const api = supertest(app);

beforeEach(async () => {
  await createTestingUser();
  await Note.deleteMany({});
  await Promise.all(INITIAL_NOTES.map((note) => new Note(note).save()));
});

describe('notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are two notes', async () => {
    const response = await api.get('/api/notes');

    assert.strictEqual(response.body.length, INITIAL_NOTES.length);
  });

  test('the first note is about HTML', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map((e) => e.content);

    assert(INITIAL_NOTES.every((n) => contents.includes(n.content)));
  });

  test('a valid note can be added ', async () => {
    const [user] = await testingUsersInDB();
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .set('Authorization', generateAuthToken(user.id))
      .send({ ...newNote, userId: user.id })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await notesInDB();
    assert.strictEqual(notesAtEnd.length, INITIAL_NOTES.length + 1);

    const contents = notesAtEnd.map((n) => n.content);

    assert(contents.includes('async/await simplifies making async calls'));
  });

  test('note without content is not added', async () => {
    const [user] = await testingUsersInDB();
    const newNote = {
      important: true,
    };

    await api
      .post('/api/notes')
      .set('Authorization', generateAuthToken(user.id))
      .send(newNote)
      .expect(400);

    const notesAtEnd = await notesInDB();

    assert.strictEqual(notesAtEnd.length, INITIAL_NOTES.length);
  });

  test('a specific note can be viewed', async () => {
    const notesAtStart = await notesInDB();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  test('a note can be deleted', async () => {
    const notesAtStart = await notesInDB();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await notesInDB();

    const contents = notesAtEnd.map((r) => r.content);
    assert(!contents.includes(noteToDelete.content));

    assert.strictEqual(notesAtEnd.length, INITIAL_NOTES.length - 1);
  });
});

after(shutdownTestingMongodb);

const INITIAL_NOTES = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

const notesInDB = () => testingItemsInDB(Note);
