const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { expressjwt } = require('express-jwt');
const { JWT_ALGORITHM, PASSWORD_HASH_ROUNDS } = require('../constants/config');

const generateAuthToken = (userId) => {
  const jwtToken = jwt.sign({ userId }, process.env.SECRET, {
    algorithm: JWT_ALGORITHM,
  });

  return `Bearer ${jwtToken}`;
};

const expressAuthMiddleware = () => {
  return expressjwt({
    secret: process.env.SECRET,
    algorithms: [JWT_ALGORITHM],
  });
};

const generatePasswordHash = (password) =>
  bcrypt.hash(password, PASSWORD_HASH_ROUNDS);

const checkPassword = async (password, user) =>
  user === null ? false : bcrypt.compare(password, user.passwordHash);

module.exports = {
  generateAuthToken,
  expressAuthMiddleware,
  generatePasswordHash,
  checkPassword,
};
