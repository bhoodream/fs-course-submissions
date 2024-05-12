const getMongoSchemaOptions = (custom) => ({
  toJSON: {
    transform: (document, returnedObject) => {
      const { toJSON } = custom || {};

      returnedObject.id = returnedObject._id.toString();

      delete returnedObject._id;
      delete returnedObject.__v;

      toJSON && toJSON.transform && toJSON.transform(document, returnedObject);
    },
  },
});

module.exports = { getMongoSchemaOptions };
