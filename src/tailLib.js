const {
  getFileOperations,
  doesFileExist,
  loadFile
} = require("./fileOperations");

const parseArguments = function(cmdLineArgs) {
  return { filePath: cmdLineArgs[2], noOfLines: 10 };
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

const performTailOperation = function(userOptions, fileOperations) {
  if (doesFileExist(fileOperations)) {
    const content = loadFile(fileOperations);
    userOptions.content = content;
    const contentToPrint = selectLast10Lines(userOptions);
    return contentToPrint;
  }
  throw new Error(`tail: ${userOptions.filePath}: No such file or directory`);
};

module.exports = {
  formatContent,
  selectLast10Lines,
  performTailOperation,
  parseArguments
};
