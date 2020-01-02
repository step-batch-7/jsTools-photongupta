'use strict';
const errorMsg = require('./errorLib');

const getNoOfLines = function(cmdLineArgs) {
  let indexOfN = cmdLineArgs.indexOf('-n');
  return cmdLineArgs.includes('-n') ? cmdLineArgs[++indexOfN] : '10';
};

const getFilePath = function(cmdLineArgs) {
  const indexOfN = cmdLineArgs.indexOf('-n');
  return cmdLineArgs.includes('-n') ? cmdLineArgs[indexOfN + 2] : cmdLineArgs[0];
};

const isNotNumber = function(noOfLines) {
  return !Number.isInteger(+noOfLines);
};

const getInvalidOptions = function(cmdLineArgs){
  const options = cmdLineArgs.filter(option => option.startsWith('-'));
  const invalidOptions = options.filter(option => {
    const validOptions = ['-n'];
    return !validOptions.includes(option);
  });
  return invalidOptions;
};

const validateInput = function(cmdLineArgs) {
  const invalidOptions = getInvalidOptions(cmdLineArgs);
  if (invalidOptions.length){
    const [invalidOption] = invalidOptions;
    return errorMsg.invalidOption(invalidOption);
  }
  const noOfLines = getNoOfLines(cmdLineArgs);
  if (isNotNumber(noOfLines)) {
    return errorMsg.illegalCount(noOfLines);
  }
  return {error: null};
};

const isLastLineEmpty = function(lines) {
  let length = lines.length;
  return lines[--length] === '';
};

const selectLastNLines = function(content, noOfLines) {
  const lines = content.split('\n');
  let numberOfLines = +noOfLines;
  let linesToSlice = -numberOfLines;
  if (isLastLineEmpty(lines)) {
    lines.pop();
  }
  if (noOfLines.startsWith('+')) {
    linesToSlice = --numberOfLines;
  }
  const lastNLines = lines.slice(linesToSlice);
  return lastNLines.join('\n');
};

module.exports = {
  getNoOfLines,
  validateInput,
  selectLastNLines,
  getFilePath
};
