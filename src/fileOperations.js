const fs = require("fs");

const getFileOperations = function(userOptions) {
  let fileOperations = {
    path: userOptions.filePath,
    encoding: "utf8",
    reader: fs.readFileSync,
    existsFile: fs.existsSync
  };
  return fileOperations;
};

const doesFileExist = function(fileOperations) {
  return fileOperations.existsFile(fileOperations.path);
};

const loadFile = function(fileOperations) {
  let content = fileOperations.reader(
    fileOperations.path,
    fileOperations.encoding
  );
  return content;
};

module.exports = { getFileOperations, doesFileExist, loadFile };
