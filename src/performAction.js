const err = require("./errorLib");
const { doesFileExist, loadFile } = require("./fileOperations");
const {
  selectLast10Lines,
  getNoOfLines,
  getFilePath,
  validateInput
} = require("./tailLib");

const parseOptions = function(cmdLineArgs) {
  const userArgs = {};
  userArgs.filePath = getFilePath(cmdLineArgs);
  userArgs.noOfLines = getNoOfLines(cmdLineArgs);
  return userArgs;
};

const getContent = function(userArgs, fileOperations) {
  const content = loadFile(fileOperations, userArgs.filePath);
  const contentToPrint = selectLast10Lines(content, userArgs.noOfLines);
  return contentToPrint;
};

const performTailOperation = function(cmdLineArgs, fileOperations) {
  const contentToPrint = { error: "", output: "" };
  const validationMsg = validateInput(cmdLineArgs);
  if (validationMsg.error != null) {
    contentToPrint.error = validationMsg.error;
    return contentToPrint;
  }
  const userArgs = parseOptions(cmdLineArgs);
  if (!doesFileExist(fileOperations, userArgs.filePath)) {
    contentToPrint.error = err.fileNotExists(userArgs.filePath);
    return contentToPrint;
  }
  contentToPrint.output = getContent(userArgs, fileOperations);
  return contentToPrint;
};

module.exports = { performTailOperation, parseOptions };
