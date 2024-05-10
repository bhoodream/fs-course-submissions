const { Person } = require('../models/person');
const infoRouter = require('express').Router();

infoRouter.get('/', async (request, response) => {
  const persons = await Person.find({});

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`,
  );
});

module.exports = { infoRouter };
