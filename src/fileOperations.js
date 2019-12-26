const doesFileExist = function(fileOperations, filePath) {
  return fileOperations.existsFile(filePath);
};

const loadFile = function(fileOperations, filePath) {
  let content = fileOperations.reader(filePath, fileOperations.encoding);
  return content;
};

module.exports = { doesFileExist, loadFile };
