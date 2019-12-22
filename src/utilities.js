const fs = require("fs");

const getFileOperations = function(filePath) {
  let fileOperations = {
    path: filePath,
    encoding: "utf8",
    reader: fs.readFileSync,
    existsFile: fs.existsSync
  };
  return fileOperations;
};

module.exports = { getFileOperations };
