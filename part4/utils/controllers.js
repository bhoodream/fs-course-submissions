const { User } = require('../models/user');

const initResourceController =
  (router) =>
  ({ Model, resource, createValidate, updateValidate, initialData }) => {
    router.get(`/`, async (request, response) => {
      const items = await Model.find({}).populate('user', {
        username: 1,
        name: 1,
      });

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

      const user = await User.findById(body.userId);

      if (createValidate) {
        const error = await createValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const newItem = new Model({
        ...initialData(body),
        user: user.id,
      });

      const savedItem = await newItem.save();
      user[resource] = (user[resource] || []).concat(savedItem._id);
      await user.save();

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
