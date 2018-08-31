#! /usr/bin/env node
const mdLinks = require('./lib/md-links').mdLinks;
const path = require('path');
const colors = require('colors');
const fetch = require('node-fetch'); 

if (require.main === module) {
  const [, , ...args] = process.argv;
  let options = {};
  if (args.includes('--validate')) options.validate = true;

  mdLinks(path.join(process.cwd(), args[0]), options).then((links) => {
    links.forEach(link => {
      let result = '';
      if (options.validate) {
        fetch(link.href)
          .then(res => {
            result = 
            `line:${link.line} - ${colors.blue(link.href)} - ${link.text} - ${colors.green(res.status)} ${colors.green(res.statusText)} - ${link.file}`;
            console.log(result);
          }).catch((err) => {
            console.error(`${colors.red('Link no existe')} ${err}`);
          }) ;
      } else 
        result = 
        `line:${link.line} - ${colors.blue(link.href)} - ${link.text} - ${link.file}`;
      console.log(result);
    });
  }).catch((error) => {
    console.error(error);
  });
}
module.exports = mdLinks;
