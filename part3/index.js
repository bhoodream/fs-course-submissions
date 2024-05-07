require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const Note = require("./models/note");
const Person = require("./models/person");

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ")
  )
);
const validatePerson = (body) =>
  !Boolean(body.name)
    ? "name is missing"
    : !Boolean(body.phone)
    ? "phone is missing"
    : "";

const resources = [
  {
    route: "notes",
    Model: Note,
    createValidate: async (body) =>
      Boolean(body.content) ? "" : "content is missing",
    create: (body) => ({
      content: body.content,
      important: Boolean(body.important) || false,
    }),
  },
  {
    route: "persons",
    Model: Person,
    createValidate: async (body) => {
      const persons = await Person.find({});

      return (
        validatePerson(body) ||
        (persons.some((p) => p.name === body.name) &&
          `person with name (${body.name}) already exists`) ||
        ""
      );
    },
    updateValidate: async (body) => {
      const persons = await Person.find({});

      return (
        validatePerson(body) ||
        (!persons.some((p) => p.name === body.name) &&
          `person with name (${body.name}) not exists`) ||
        ""
      );
    },
    create: (body) => body,
  },
];

app.get("/api/info", async (request, response) => {
  const persons = await Person.find({});

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

resources.forEach(
  ({ route, Model, createValidate, updateValidate, create }) => {
    app.get(`/api/${route}`, async (request, response) => {
      const items = await Model.find({});

      response.json(items);
    });

    app.get(`/api/${route}/:id`, async (request, response) => {
      let item;

      try {
        item = await Model.findById(request.params.id);
      } catch (e) {
        return response.status(500).json({ error: e.toString() });
      }

      if (item) {
        response.json(item);
      } else {
        response.status(404).end();
      }
    });

    app.delete(`/api/${route}/:id`, async (request, response) => {
      try {
        await Model.findOneAndDelete({ _id: request.params.id });
      } catch (e) {
        return response.status(500).json({ error: e.toString() });
      }

      response.status(204).end();
    });

    app.post(`/api/${route}`, async (request, response) => {
      const body = request.body;
      const createError = await createValidate(body);

      if (createError) {
        return response.status(400).json({ error: createError });
      }

      const newItem = new Model(create(body));
      const savedItem = await newItem.save();

      response.json(savedItem);
    });

    app.put(`/api/${route}/:id`, async (request, response) => {
      const body = request.body;
      const updateError = await updateValidate(body);

      if (updateError) {
        return response.status(400).json({ error: updateError });
      }

      const updatedItem = await Model.findOneAndUpdate(
        { name: body.name },
        body,
        { new: true }
      );

      response.json(updatedItem);
    });
  }
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
