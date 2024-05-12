const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const { User } = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const savedUser = await new User({
    username,
    name,
    passwordHash,
  }).save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  });
  response.json(users);
});

module.exports = { usersRouter };
