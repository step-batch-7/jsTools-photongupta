"use strict";
const errorMsg = require("./errorLib");

const getNoOfLines = function(cmdLineArgs) {
  return cmdLineArgs.includes("-n")
    ? cmdLineArgs[cmdLineArgs.indexOf("-n") + 1]
    : "10";
};

const isNotNumber = function(noOfLines) {
  return !Number.isInteger(+noOfLines);
};

const getInvalidOptions = function(cmdLineArgs) {
  const options = cmdLineArgs.filter(option => option.slice(0, 1) == "-");
  const invalidOptions = options.filter(option => {
    const validOptions = ["-n"];
    return !validOptions.includes(option);
  });
  return invalidOptions;
};

const validateInput = function(cmdLineArgs) {
  const invalidOptions = getInvalidOptions(cmdLineArgs);
  if (invalidOptions.length != 0)
    return errorMsg.invalidOption(invalidOptions[0]);
  const noOfLines = getNoOfLines(cmdLineArgs);
  if (isNotNumber(noOfLines)) {
    return errorMsg.illegalCount(noOfLines);
  }
  return { error: null };
};

const isLastLineEmpty = function(lines) {
  return lines[lines.length - 1] == "";
};

const selectLastNLines = function(content, noOfLines) {
  const splitLines = content.split("\n");
  const lines = +noOfLines;
  if (isLastLineEmpty(splitLines)) {
    splitLines.pop();
  }
  let lastNLines = splitLines.slice(-lines);
  if (noOfLines.startsWith("+")) {
    lastNLines = splitLines.slice(lines - 1);
  }
  return lastNLines.join("\n");
};

module.exports = {
  getNoOfLines,
  validateInput,
  selectLastNLines
};
