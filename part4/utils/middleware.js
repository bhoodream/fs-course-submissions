const morgan = require('morgan');
const { error } = require('../utils/logger');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, request, response, next) => {
  error(err.name);

  if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message });
  }

  next(err);
};

morgan.token('body', (req) => JSON.stringify(req.body));

const morganLogger = morgan(
  (tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens['body'](req, res),
    ].join(' '),
  { skip: () => process.env.NODE_ENV === 'test' },
);

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganLogger,
};
