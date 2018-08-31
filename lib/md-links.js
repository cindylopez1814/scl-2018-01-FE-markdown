const fs = require('fs');
const path = require('path');
const Marked = require('marked');


let validate = false;
let stats = false;
let mdLinks = {};

mdLinks.mdLinks = (newPath, options) => {
  return new Promise((resolve, reject) => {
    if (!newPath)
      return reject('Ingrese un archivo valido');
    if (options.validate) validate = true;
    let pathAbsolute = mdLinks.isAbsoluteOrRelative(newPath);  
    let validateFile = mdLinks.validateFile(pathAbsolute);
    if (validateFile === '.md') {
      mdLinks.readFiles(pathAbsolute).then((data) => {
        resolve(data);
      });
    }        
  });
};

mdLinks.isAbsoluteOrRelative = (newPath) => {
  if (path.isAbsolute(newPath) === false) 
    return mdLinks.convertPathToAbsolute(newPath);
  if (path.isAbsolute(newPath) === true)  
    return newPath;
};

mdLinks.convertPathToAbsolute = (newPath) => {
  return path.resolve(newPath);
};

mdLinks.validateFile = (file) => {
  return path.extname(file);
};

mdLinks.readFiles = (newPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(newPath, 'utf8', (err, data) => {
      if (err) reject(err);
      data = data.split('\n').map((element, index) => mdLinks.markdownLinkExtractor(newPath, element, index + 1)).filter(element => element.length !== 0).reduce((value1, value2) => value1.concat(value2));
      resolve(data);
    });
  });
};

mdLinks.markdownLinkExtractor = (file, markdown, line) => {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      line: line,
      file: file
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      line: line,
      file: file
    });
  };
  Marked(markdown, {renderer: renderer});

  return links;
};

module.exports = mdLinks;