const initResourceController =
  (router) =>
  ({ Model, createValidate, updateValidate, initialData }) => {
    router.get(`/`, async (request, response) => {
      const items = await Model.find({});

      response.json(items);
    });

    router.get(`/:id`, async (request, response, next) => {
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

    router.delete(`/:id`, async (request, response, next) => {
      try {
        await Model.findByIdAndDelete(request.params.id);

        response.status(204).end();
      } catch (e) {
        next(e);
      }
    });

    router.post(`/`, async (request, response, next) => {
      const body = request.body;

      if (createValidate) {
        const error = await createValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const newItem = new Model(initialData(body));

      try {
        const savedItem = await newItem.save();
        console.log(savedItem);
        response.json(savedItem);
      } catch (error) {
        next(error);
      }
    });

    router.put(`/:id`, async (request, response, next) => {
      const body = request.body;

      if (updateValidate) {
        const error = await updateValidate(body);

        if (error) return response.status(400).json({ error });
      }

      try {
        const updatedItem = await Model.findByIdAndUpdate(
          request.params.id,
          body,
          { new: true, runValidators: true, context: 'query' },
        );

        response.json(updatedItem);
      } catch (error) {
        next(error);
      }
    });
  };

module.exports = { initResourceController };
