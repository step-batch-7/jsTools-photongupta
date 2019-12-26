const errorMsg = require("./errorLib");
const { doesFileExist, loadFile } = require("./fileOperations");
const { selectLastNLines, getNoOfLines, validateInput } = require("./tailLib");

const performTail = function(cmdLineArgs, fileOperations) {
  const validationMsg = validateInput(cmdLineArgs);
  const parsedOptions = parseOptions(cmdLineArgs);
  if (validationMsg.error) {
    return validationMsg;
  }
  if (!doesFileExist(fileOperations, parsedOptions.filePath)) {
    return errorMsg.fileNotExists(parsedOptions.filePath);
  }
  return getContent(parsedOptions, fileOperations);
};

const parseOptions = function(userOptions) {
  const parsedOptions = {};
  parsedOptions.filePath = userOptions[userOptions.length - 1];
  parsedOptions.noOfLines = +getNoOfLines(userOptions);
  return parsedOptions;
};

const getContent = function(parsedOptions, fileOperations) {
  const content = loadFile(fileOperations, parsedOptions.filePath);
  const contentToPrint = selectLastNLines(content, parsedOptions.noOfLines);
  return { error: "", output: contentToPrint };
};

module.exports = { performTail, parseOptions };
