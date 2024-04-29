const express = require("express");
const morgan = require("morgan");
const app = express();
const persons = require("./mock/persons.json");

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

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const resources = [
  {
    route: "notes",
    items: notes,
    createValidate: (body) =>
      Boolean(body.content) ? "" : "content is missing",
    create: (body) => ({
      content: body.content,
      important: Boolean(body.important) || false,
    }),
  },
  {
    route: "persons",
    items: persons,
    createValidate: (body) =>
      !Boolean(body.name)
        ? "name is missing"
        : !Boolean(body.number)
        ? "number is missing"
        : persons.some((p) => p.name === body.name)
        ? `person with name (${body.name}) already exists`
        : "",
    create: (body) => body,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World123!</h1>");
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

resources.forEach(({ route, items, createValidate, create }) => {
  app.get(`/api/${route}`, (request, response) => {
    response.json(items);
  });

  app.get(`/api/${route}/:id`, (request, response) => {
    const id = Number(request.params.id);
    const item = items.find((i) => i.id === id);

    if (item) {
      response.json(item);
    } else {
      response.status(404).end();
    }
  });

  app.delete(`/api/${route}/:id`, (request, response) => {
    const id = Number(request.params.id);
    const deleteIndex = items.findIndex((i) => i.id === id);

    deleteIndex !== -1 && items.splice(deleteIndex, 1);

    response.status(204).end();
  });

  app.post(`/api/${route}`, (request, response) => {
    const body = request.body;
    const createError = createValidate(body);

    if (createError) {
      return response.status(400).json({ error: createError });
    }

    const newItem = { ...create(body), id: generateId(items) };

    items.push(newItem);

    response.json(newItem);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const generateId = (items) => {
  const maxId = items.length > 0 ? Math.max(...items.map((n) => n.id)) : 0;

  return maxId + 1;
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
