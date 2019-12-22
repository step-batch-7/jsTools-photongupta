const {
  getFileOperations,
  doesFileExist,
  loadFile
} = require("./fileOperations");

const parseArguments = function(cmdLineArgs) {
  return cmdLineArgs[2];
};

const formatContent = function(last10Lines) {
  return last10Lines.join("\n");
};

const selectLast10Lines = function(contentAndNoOfLines) {
  const last10Lines = contentAndNoOfLines.content
    .split("\n")
    .slice(-contentAndNoOfLines.noOfLines);
  return formatContent(last10Lines);
};

const performTailOperation = function(filePath) {
  const fileOperations = getFileOperations(filePath);
  if (doesFileExist(fileOperations)) {
    const content = loadFile(fileOperations);
    const contentAndNoOfLines = { content: content, noOfLines: 10 };
    const contentToPrint = selectLast10Lines(contentAndNoOfLines);
    return contentToPrint;
  }
  throw new Error(`tail: ${filePath}: No such file or directory`);
};

module.exports = {
  formatContent,
  selectLast10Lines,
  performTailOperation,
  parseArguments
};
