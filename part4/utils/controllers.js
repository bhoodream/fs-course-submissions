const initResourceController =
  (router) =>
  ({ Model, createValidate, updateValidate, initialData }) => {
    router.get(`/`, async (request, response) => {
      const items = await Model.find({});

      response.json(items);
    });

    router.get(`/:id`, async (request, response) => {
      const item = await Model.findById(request.params.id);

      if (item) {
        response.json(item);
      } else {
        response.status(404).end();
      }
    });

    router.delete(`/:id`, async (request, response) => {
      await Model.findByIdAndDelete(request.params.id);
      response.status(204).end();
    });

    router.post(`/`, async (request, response) => {
      const body = request.body;

      if (createValidate) {
        const error = await createValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const newItem = new Model(initialData(body));

      const savedItem = await newItem.save();
      response.status(201).json(savedItem);
    });

    router.put(`/:id`, async (request, response) => {
      const body = request.body;

      if (updateValidate) {
        const error = await updateValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const updatedItem = await Model.findByIdAndUpdate(
        request.params.id,
        body,
        { new: true, runValidators: true, context: 'query' },
      );

      response.json(updatedItem);
    });
  };

module.exports = { initResourceController };
