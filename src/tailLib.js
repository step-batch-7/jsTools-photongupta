'use strict';
const errorMsg = require('./errorLib');

const getLinesAndFilePath = function(cmdLineArgs) {
  const indexOfN = cmdLineArgs.indexOf('-n');
  let noOfLines = '10';
  let filePath = cmdLineArgs[0];
  if(cmdLineArgs.includes('-n')){
    noOfLines = cmdLineArgs[indexOfN + 1];
    filePath = cmdLineArgs[indexOfN + 2];
  }
  return [noOfLines, filePath];
};

const isNumber = function(noOfLines) {
  return Number.isInteger(+noOfLines);
};

const getInvalidOptions = function(cmdLineArgs){
  const options = cmdLineArgs.filter(option => option.startsWith('-'));
  const invalidOptions = options.filter(option => {
    const validOptions = ['-n'];
    return !validOptions.includes(option);
  });
  return invalidOptions;
};

const parseOptions = function(cmdLineArgs) {
  const invalidOptions = getInvalidOptions(cmdLineArgs);
  if (invalidOptions.length){
    const [invalidOption] = invalidOptions;
    return {error: errorMsg.invalidOption(invalidOption)};
  }
  const [noOfLines, filePath] = getLinesAndFilePath(cmdLineArgs);
  if (!isNumber(noOfLines)) {
    return {error: errorMsg.illegalCount(noOfLines)};
  }
  return {error: null, noOfLines, filePath};
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
  parseOptions,
  selectLastNLines,
  getLinesAndFilePath
};
