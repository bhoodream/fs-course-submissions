const { User } = require('../models/user');
const { expressAuthMiddleware } = require('./auth');

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

    router.delete(
      `/:id`,
      expressAuthMiddleware(),
      async (request, response) => {
        if (!request.auth.userId) return authError(response);
        if (!(await checkUserOwn(Model, request)))
          return forbiddenError(response);

        await Model.findByIdAndDelete(request.params.id);
        response.status(204).end();
      },
    );

    router.post(`/`, expressAuthMiddleware(), async (request, response) => {
      const body = request.body;

      if (!request.auth.userId) return authError(response);

      const user = await User.findById(request.auth.userId);

      if (createValidate) {
        const error = await createValidate(body);

        if (error) return response.status(400).json({ error });
      }

      const newItem = new Model({
        ...initialData(body),
        user: user._id,
      });

      const savedItem = await newItem.save();
      user[resource] = (user[resource] || []).concat(savedItem._id);
      await user.save();

      response.status(201).json(savedItem);
    });

    router.put(`/:id`, expressAuthMiddleware(), async (request, response) => {
      const body = request.body;

      if (!request.auth.userId) return authError(response);
      if (!(await checkUserOwn(Model, request)))
        return forbiddenError(response);

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

const checkUserOwn = async (Model, request) => {
  const item = await Model.findById(request.params.id);

  return item.user && item.user.toString() === request.auth.userId;
};

const authError = (response) =>
  response.status(401).json({ error: 'token invalid' });

const forbiddenError = (response) =>
  response.status(403).json({ error: 'forbidden' });

module.exports = { initResourceController };
