const err = require("./errorLib");

const getFilePath = function(cmdLineArgs) {
  const fileName = cmdLineArgs.includes("-n")
    ? cmdLineArgs[cmdLineArgs.indexOf("-n") + 2]
    : cmdLineArgs[0];
  return fileName;
};

const getNoOfLines = function(cmdLineArgs) {
  const noOfLines = cmdLineArgs.includes("-n")
    ? cmdLineArgs[cmdLineArgs.indexOf("-n") + 1]
    : "10";
  return noOfLines;
};

const getOptions = function(cmdLineArgs) {
  const userOptions = cmdLineArgs.includes("-n")
    ? cmdLineArgs.slice(0, cmdLineArgs.indexOf("-n") + 1)
    : cmdLineArgs;
  const options = userOptions.filter(option => option.slice(0, 1) == "-");
  return options;
};

const validateInput = function(cmdLineArgs) {
  const options = getOptions(cmdLineArgs);
  const invalidOptions = options.filter(getInvalidOptions);
  if (invalidOptions.length != 0)
    return { error: err.invalidOption(invalidOptions[0]) };
  const noOfLines = getNoOfLines(cmdLineArgs);
  if (isNotNumber(noOfLines)) {
    return { error: err.illegalCount(noOfLines) };
  }
  return { error: null };
};

const isNotNumber = function(noOfLines) {
  return !Number.isInteger(+noOfLines);
};

const getInvalidOptions = function(option) {
  const validOptions = ["-n"];
  return !validOptions.includes(option);
};

const selectLastNLines = function(content, noOfLines) {
  const last10Lines = content.split("\n").slice(-noOfLines - 1);
  return last10Lines.join("\n");
};

module.exports = {
  getFilePath,
  getNoOfLines,
  validateInput,
  selectLastNLines
};
