const express = require('express');
const cors = require('cors');
const {
  unknownEndpoint,
  errorHandler,
  morganLogger,
} = require('./utils/middleware');
const { notesRouter } = require('./controllers/notes');
const { personsRouter } = require('./controllers/persons');
const { infoRouter } = require('./controllers/info');
const { blogsRouter } = require('./controllers/blogs');

require('./mongooseConnection');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(morganLogger);
app.use('/api/info', infoRouter);
app.use('/api/notes', notesRouter);
app.use('/api/persons', personsRouter);
app.use('/api/blogs', blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = { app };
