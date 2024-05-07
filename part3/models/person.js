const mongooseConnection = require("../mongooseConnection");
const { getMongoSchemaOptions } = require("../utils/models");

const schema = new mongooseConnection.Schema(
  { name: String, phone: String },
  getMongoSchemaOptions()
);

module.exports = mongooseConnection.model("Person", schema);
