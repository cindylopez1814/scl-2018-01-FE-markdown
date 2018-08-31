#! /usr/bin/env node
const mdLinks = require('./lib/md-links').mdLinks;
const path = require('path');
const colors = require('colors');

if (require.main === module) {
  const [, , ...args] = process.argv;
  let options = {};
  if (args.includes('--validate')) options.validate = true;
  if (args.includes('--stats')) options.stats = true;

  mdLinks(path.join(process.cwd(), args[0]), options).then((links) => {
    links.forEach(link => {
      let result = '';
      if (options.validate) result = 
        `${link.file} - line:${link.line} - ${colors.green(link.href)} - ${link.text} - ${link.ok} - ${link.status}`;
      else result = 
        `${link.file} - line:${link.line} : ${colors.green(link.href)} : ${link.text}`;
      console.log(result);
    });
  }).catch((error) => {
    console.error(error);
  });
}
module.exports = mdLinks;
