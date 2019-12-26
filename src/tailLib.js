const errorMsg = require("./errorLib");

const getNoOfLines = function(cmdLineArgs) {
  return cmdLineArgs.includes("-n")
    ? cmdLineArgs[cmdLineArgs.indexOf("-n") + 1]
    : 10;
};

const isNotNumber = function(noOfLines) {
  return !Number.isInteger(+noOfLines);
};

const getInvalidOptions = function(cmdLineArgs) {
  options = cmdLineArgs.filter(option => option.slice(0, 1) == "-");
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

const selectLastNLines = function(content, noOfLines) {
  const splitLines = content.split("\n");
  if (splitLines[splitLines.length - 1] == "") splitLines.pop();
  const last10Lines = splitLines.slice(-noOfLines);
  return last10Lines.join("\n");
};

module.exports = {
  getNoOfLines,
  validateInput,
  selectLastNLines
};
