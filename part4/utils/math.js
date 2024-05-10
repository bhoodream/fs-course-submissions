const reverse = (string) => {
  return string.split('').reverse().join('');
};

const average = (array) => {
  if (array.length === 0) return 0;

  return sum(array) / array.length;
};

const sum = (array) => {
  if (array.length === 0) return 0;

  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.reduce(reducer, 0);
};

module.exports = {
  reverse,
  average,
  sum,
};
