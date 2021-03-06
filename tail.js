'use strict';
const {readFile} = require('fs');
const {stdin} = require('process');
const {performTail} = require('./src/performAction');

const main = function() {
  const [, , ...cmdLineArgs] = process.argv;
  const contentLoader = {stdin, readFile};
  const displayMsg = function(contentToPrint) {
    const {output, error} = contentToPrint;
    process.stdout.write(output);
    process.stderr.write(error);
  };
  performTail(cmdLineArgs, contentLoader, displayMsg);
};

main();
