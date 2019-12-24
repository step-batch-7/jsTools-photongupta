const fs = require("fs");

const getFileOperations = function() {
  let fileOperations = {
    encoding: "utf8",
    reader: fs.readFileSync,
    existsFile: fs.existsSync
  };
  return fileOperations;
};

const doesFileExist = function(fileOperations, filePath) {
  return fileOperations.existsFile(filePath);
};

const loadFile = function(fileOperations, filePath) {
  let content = fileOperations.reader(filePath, fileOperations.encoding);
  return content;
};

module.exports = { getFileOperations, doesFileExist, loadFile };
