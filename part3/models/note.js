const mongooseConnection = require("../mongooseConnection");
const { getMongoSchemaOptions } = require("../utils/models");

const schema = new mongooseConnection.Schema(
  { content: String, important: Boolean },
  getMongoSchemaOptions()
);

module.exports = mongooseConnection.model("Note", schema);
