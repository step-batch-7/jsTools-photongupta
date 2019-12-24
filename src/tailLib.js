const { err } = require("./errorLib");

const getFilePath = function(cmdLineArgs) {
  const fileName = cmdLineArgs.includes("-n")
    ? cmdLineArgs[cmdLineArgs.indexOf("-n") + 2]
    : cmdLineArgs[0];
  return fileName;
};

const getNoOfLines = function(cmdLineArgs) {
  const noOfLines = cmdLineArgs.includes("-n")
    ? +cmdLineArgs[cmdLineArgs.indexOf("-n") + 1]
    : 10;
  return noOfLines;
};

const getOptions = function(cmdLineArgs) {
  const options = cmdLineArgs.filter((option, index, cmdLineArgs) => {
    if (cmdLineArgs.includes("-n")) {
      return option.slice(0, 1) == "-" && index <= cmdLineArgs.indexOf("-n");
    }
    return option.slice(0, 1) == "-";
  });
  return options;
};

const getInvalidOptions = function(option) {
  const validOptions = ["-n"];
  return !validOptions.includes(option);
};

const formatContent = function(last10Lines) {
  return last10Lines.join("\n");
};

const selectLast10Lines = function(contentAndNoOfLines) {
  const last10Lines = contentAndNoOfLines.content
    .split("\n")
    .slice(-contentAndNoOfLines.noOfLines - 1);
  return formatContent(last10Lines);
};

const isInValidOptionsPresent = function(invalidOptions) {
  return invalidOptions.length != 0;
};

const isOptionArgsIsInteger = function(cmdLineArgs) {
  return !Number.isInteger(+getNextElement(cmdLineArgs, "-n"));
};

const isNoOfLinesValid = function(cmdLineArgs) {
  return cmdLineArgs.includes("-n") && isOptionArgsIsInteger(cmdLineArgs);
};

const getNextElement = function(array, element) {
  return array[array.indexOf(element) + 1];
};

const validateInput = function(cmdLineArgs) {
  const options = getOptions(cmdLineArgs);
  const invalidOptions = options.filter(getInvalidOptions);
  if (isInValidOptionsPresent(invalidOptions))
    return { error: err.invalidOption(invalidOptions[0]) };
  if (isNoOfLinesValid(cmdLineArgs)) {
    return { error: err.illegalCount(getNextElement(cmdLineArgs, "-n")) };
  }
  return { error: null };
};

module.exports = {
  getFilePath,
  getNoOfLines,
  validateInput,
  selectLast10Lines,
  formatContent
};
