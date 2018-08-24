const sum = require('../lib/md-links');

test('debiera ser una funcion', () => {
  expect(mdLinks()).toBeDefined();
  expect(mdLinks).toHaveReturned();
  expect(path).toHaveProperty('href');
  expect(path).toHaveProperty('text');
  expect(path).toHaveProperty('file');
  expect(path).toHaveProperty('status');
});
