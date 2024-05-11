const resourceItemsInDB = async (Model) => {
  const items = await Model.find({});
  return items.map((i) => i.toJSON());
};

module.exports = {
  resourceItemsInDB,
};
