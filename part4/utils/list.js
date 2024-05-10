const { sum } = require('./math');
const { entries, countBy, groupBy, sumBy, maxBy } = require('lodash');

const totalLikes = (list) => sum(list.map((i) => i.likes));
const mostLikes = (list) => {
  const grouped = groupBy(list, 'author');
  const summed = entries(grouped).map(([author, blogs]) => ({
    author,
    likes: sumBy(blogs, 'likes'),
  }));

  return maxBy(summed, 'likes');
};
const mostBlogs = (list) => {
  const counted = countBy(list, 'author');
  const prepared = entries(counted).map(([author, blogs]) => ({
    author,
    blogs,
  }));

  return maxBy(prepared, 'blogs');
};
const favoriteBlog = (list) => {
  return maxBy(list, 'likes');
};

module.exports = {
  totalLikes,
  mostLikes,
  mostBlogs,
  favoriteBlog,
};
