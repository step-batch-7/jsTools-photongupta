'use strict';
const errorMsg = require('./errorLib');
const {selectLastNLines, parseOptions} = require('./tailLib');

const loadFile = function(filePath, noOfLines, readFile, onCompletion) {
  const contentToPrint = {error: '', output: ''};
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      contentToPrint.error = errorMsg.fileNotExists(filePath);
    }
    else {
      contentToPrint.output = selectLastNLines(content, noOfLines);
    }
    return onCompletion(contentToPrint);
  });
};

const loadFromStdin = function(stdin, onCompletion, noOfLines) {
  stdin.setEncoding('utf8');
  const contentToPrint = {error: '', output: ''};
  let content = '';
  stdin.on('data', ( data) => {
    content += data;
  });
  stdin.on('end', () => {
    contentToPrint.output = selectLastNLines(content, noOfLines);
    onCompletion(contentToPrint);
  });
};

const performTail = function(cmdLineArgs, contentLoader, onCompletion) {
  const {stdin, readFile} = contentLoader;
  const {error, noOfLines, filePath} = parseOptions(cmdLineArgs);
  if (error) {
    return onCompletion(error);
  }
  if (filePath === undefined) {
    loadFromStdin(stdin, onCompletion, noOfLines);
    return;
  }
  loadFile(filePath, noOfLines, readFile, onCompletion);
};

module.exports = {performTail, loadFromStdin};
