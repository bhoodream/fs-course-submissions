const { Person } = require('../models/person');
const { initResourceController } = require('../utils/controllers');
const { validatePerson } = require('../utils/validate');
const personsRouter = require('express').Router();

initResourceController(personsRouter)({
  Model: Person,
  createValidate: async (body) => {
    const persons = await Person.find({});

    return (
      validatePerson(body) ||
      (persons.some((p) => p.name === body.name) &&
        `person with name (${body.name}) already exists`) ||
      ''
    );
  },
  updateValidate: async (body) => {
    const persons = await Person.find({});

    return (
      validatePerson(body) ||
      (!persons.some((p) => p.name === body.name) &&
        `person with name (${body.name}) not exists`) ||
      ''
    );
  },
  initialData: (body) => body,
});

module.exports = { personsRouter };
