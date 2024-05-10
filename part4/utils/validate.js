const validatePerson = (body) =>
  !body.name ? 'name is missing' : !body.phone ? 'phone is missing' : '';

module.exports = { validatePerson };
