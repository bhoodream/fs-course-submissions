const { test, describe } = require('node:test');
const assert = require('node:assert');
const {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list');

describe('totalLikes', () => {
  test('of empty list is zero (0)', () => {
    const blogs = [];

    assert.strictEqual(totalLikes(blogs), 0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];

    assert.strictEqual(totalLikes(blogs), 5);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 15,
        __v: 0,
      },
    ];

    assert.strictEqual(totalLikes(blogs), 20);
  });
});

describe('favoriteBlog', () => {
  test('works', () => {
    const favorite = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0,
    };

    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      favorite,
    ];

    assert.deepStrictEqual(favoriteBlog(blogs), favorite);
  });
});

describe('mostBlogs', () => {
  test('works', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Go To Statement Considered Harmful',
        author: 'most',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Go To Statement Considered Harmful',
        author: 'most',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '4',
        title: 'Go To Statement Considered Harmful',
        author: 'most',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];

    assert.deepStrictEqual(mostBlogs(blogs), { author: 'most', blogs: 3 });
  });
});

describe('mostLikes', () => {
  test('works', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Go To Statement Considered Harmful',
        author: 'most',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Go To Statement Considered Harmful',
        author: 'most',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0,
      },
    ];

    assert.deepStrictEqual(mostLikes(blogs), { author: 'most', likes: 10 });
  });
});
