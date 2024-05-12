const usersRouter = require('express').Router();
const { User } = require('../models/user');
const { generatePasswordHash } = require('../utils/auth');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3)
    return response.status(400).json({ error: 'bad password' });

  const passwordHash = await generatePasswordHash(password);
  const savedUser = await new User({
    username,
    name,
    passwordHash,
  }).save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('notes', { content: 1, important: 1 })
    .populate('people', { name: 1, phone: 1 })
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });

  response.json(users);
});

module.exports = { usersRouter };
