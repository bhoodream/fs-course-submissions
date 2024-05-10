const { test, describe } = require('node:test');
const assert = require('node:assert');
const { reverse, average, sum } = require('../utils/math');

describe('reverse', () => {
  test('of a', () => {
    assert.strictEqual(reverse('a'), 'a');
  });

  test('of react', () => {
    assert.strictEqual(reverse('react'), 'tcaer');
  });

  test('of saippuakauppias', () => {
    assert.strictEqual(reverse('saippuakauppias'), 'saippuakauppias');
  });
});

describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1);
  });

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5);
  });

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0);
  });
});

describe('sum', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(sum([1]), 1);
  });

  test('of many is calculated right', () => {
    assert.strictEqual(sum([1, 2, 3, 4, 5, 6]), 21);
  });

  test('of empty array is zero', () => {
    assert.strictEqual(sum([]), 0);
  });
});
