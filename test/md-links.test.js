const mdLinks = require('../lib/md-links');

describe('mdLinks module', () => {
  test('mdLinks es un objeto', () => {
    expect(typeof mdLinks).toBe('object');
  });
});

describe('mdLinks.validateFile', () => {
  test('Debería devolver la extensión del archivo', () => {
    expect(mdLinks.validateFile('../README.md')).toBe('.md');
  });
});

describe('mdLinks.isAbsoluteOrRelative', () => {
  test('Debe restornar false para ruta relativa', () => {
    expect(mdLinks.isAbsoluteOrRelative('../README.md')).toBeTruthy();
  });
});

describe('mdLinks.convertPathToAbsolute', () => {
  test('Debe retornar ruta absoluta', () => {
    expect(mdLinks.convertPathToAbsolute('./lib/md-links.js')).toBe('C:\\Users\\CindyArlett\\Documents\\Laboratoria\\proyectos\\scl-2018-01-FE-markdown\\lib\\md-links.js');
  });
});