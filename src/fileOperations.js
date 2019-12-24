const fs = require("fs");

const getFileOperations = function() {
  let fileOperations = {
    encoding: "utf8",
    reader: fs.readFileSync,
    existsFile: fs.existsSync
  };
  return fileOperations;
};

const doesFileExist = function(fileOperations) {
  return fileOperations.existsFile(fileOperations.filePath);
};

const loadFile = function(fileOperations) {
  let content = fileOperations.reader(
    fileOperations.filePath,
    fileOperations.encoding
  );
  return content;
};

module.exports = { getFileOperations, doesFileExist, loadFile };
