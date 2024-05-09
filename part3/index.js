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
    prepareData: (body) => ({
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
    prepareData: (body) => body,
  },
];

app.get("/api/info", async (request, response) => {
  const persons = await Person.find({});

  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

resources.forEach(
  ({ route, Model, createValidate, updateValidate, prepareData }) => {
    app.get(`/api/${route}`, async (request, response) => {
      const items = await Model.find({});

      response.json(items);
    });

    app.get(`/api/${route}/:id`, async (request, response, next) => {
      try {
        const item = await Model.findById(request.params.id);

        if (item) {
          response.json(item);
        } else {
          response.status(404).end();
        }
      } catch (e) {
        next(e);
      }
    });

    app.delete(`/api/${route}/:id`, async (request, response, next) => {
      try {
        await Model.findByIdAndDelete(request.params.id);

        response.status(204).end();
      } catch (e) {
        next(e);
      }
    });

    app.post(`/api/${route}`, async (request, response, next) => {
      const body = request.body;

      if (createValidate) {
        const error = await createValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const newItem = new Model(prepareData(body));

      try {
        const savedItem = await newItem.save();
        response.json(savedItem);
      } catch (error) {
        next(error);
      }
    });

    app.put(`/api/${route}/:id`, async (request, response, next) => {
      const body = request.body;

      if (updateValidate) {
        const error = await updateValidate(body);

        if (error) return response.status(400).json({ error });
      }

      try {
        const updatedItem = await Model.findByIdAndUpdate(
          request.params.id,
          prepareData(body),
          { new: true, runValidators: true, context: "query" }
        );

        response.json(updatedItem);
      } catch (error) {
        next(error);
      }
    });
  }
);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
