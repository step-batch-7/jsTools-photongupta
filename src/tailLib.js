const { getFileOperations, doesFileExist, readFile } = require("./utilities");

const formatContent = function(last10Lines) {
  return last10Lines.join("\n");
};

const selectLast10Lines = function(contentAndNoOfLines) {
  const last10Lines = contentAndNoOfLines.content
    .split("\n")
    .slice(-contentAndNoOfLines.noOfLines);
  return last10Lines;
};

const loadFile = function(filePath) {
  const fileOperations = getFileOperations(filePath);
  if (doesFileExist(fileOperations)) {
    const content = readFile(fileOperations);
    return content;
  }
  throw new Error(`tail: ${filePath}: No such file or directory`);
};

module.exports = { formatContent, selectLast10Lines, loadFile };
