const { err } = require("./errorLib");
const { doesFileExist, loadFile } = require("./fileOperations");
const {
  selectLast10Lines,
  getNoOfLines,
  getFilePath,
  validateInput
} = require("./tailLib");

const parseOptions = function(filePath, cmdLineArgs) {
  const userArgs = {};
  userArgs.filePath = filePath;
  userArgs.noOfLines = getNoOfLines(cmdLineArgs);
  return userArgs;
};

const getContent = function(userArgs, fileOperations) {
  const content = loadFile(fileOperations);
  userArgs.content = content;
  const contentToPrint = selectLast10Lines(userArgs);
  return contentToPrint;
};

const performTailOperation = function(cmdLineArgs, fileOperations) {
  const filePath = getFilePath(cmdLineArgs);
  fileOperations.filePath = filePath;
  const inputValidation = validateInput(cmdLineArgs);
  if (inputValidation.error != null) {
    return { error: inputValidation.error, output: "" };
  }
  if (!doesFileExist(fileOperations)) {
    return { error: err.fileNotExists(filePath), output: "" };
  }
  const userArgs = parseOptions(filePath, cmdLineArgs);
  const contentToPrint = getContent(userArgs, fileOperations);
  return { error: "", output: contentToPrint };
};

module.exports = { performTailOperation, parseOptions };
