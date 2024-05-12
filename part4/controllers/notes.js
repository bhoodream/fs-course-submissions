const { Note } = require('../models/note');
const { initResourceController } = require('../utils/controllers');
const notesRouter = require('express').Router();

initResourceController(notesRouter)({
  resource: 'notes',
  Model: Note,
  createValidate: async (body) => (!body.content ? 'content is missing' : ''),
  initialData: (body) => ({
    content: body.content,
    important: Boolean(body.important) || false,
  }),
});

module.exports = { notesRouter };
