module.exports = {
  PORT: process.env.PORT,
  JWT_ALGORITHM: 'HS256',
  JWT_EXPIRED_SEC: 60 * 60,
  PASSWORD_HASH_ROUNDS: 10,
};
