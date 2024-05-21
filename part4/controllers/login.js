const loginRouter = require('express').Router();
const { User } = require('../models/user');
const { generateAuthToken, checkPassword } = require('../utils/auth');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect = await checkPassword(password, user);

  if (!isPasswordCorrect) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  response.status(200).send({
    token: generateAuthToken(user._id),
    id: user._id,
    username: user.username,
    name: user.name,
  });
});

module.exports = { loginRouter };
