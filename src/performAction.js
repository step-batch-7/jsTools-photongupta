const err = require("./errorLib");
const { doesFileExist, loadFile } = require("./fileOperations");
const {
  selectLastNLines,
  getNoOfLines,
  getFilePath,
  validateInput
} = require("./tailLib");

const parseOptions = function(userOptions) {
  const parsedOptions = {};
  parsedOptions.filePath = getFilePath(userOptions);
  parsedOptions.noOfLines = +getNoOfLines(userOptions) || 10;
  return parsedOptions;
};

const getContent = function(parsedOptions, fileOperations) {
  const content = loadFile(fileOperations, parsedOptions.filePath);
  return selectLastNLines(content, parsedOptions.noOfLines);
};

const performTail = function(cmdLineArgs, fileOperations) {
  const contentToPrint = { error: "", output: "" };
  const validationMsg = validateInput(cmdLineArgs);
  if (validationMsg.error != null) {
    contentToPrint.error = validationMsg.error;
    return contentToPrint;
  }
  const parsedOptions = parseOptions(cmdLineArgs);
  if (!doesFileExist(fileOperations, parsedOptions.filePath)) {
    contentToPrint.error = err.fileNotExists(parsedOptions.filePath);
    return contentToPrint;
  }
  contentToPrint.output = getContent(parsedOptions, fileOperations);
  return contentToPrint;
};

module.exports = { performTail, parseOptions };
