const { doesFileExist, loadFile } = require("./fileOperations");
const { selectLast10Lines, generateError } = require("./tailLib");

const performTailOperation = function(userOptions, fileOperations) {
  if (doesFileExist(fileOperations)) {
    const content = loadFile(fileOperations);
    userOptions.content = content;
    const contentToPrint = selectLast10Lines(userOptions);
    return contentToPrint;
  }
  generateError(`tail: ${userOptions.filePath}: No such file or directory`);
};
module.exports = { performTailOperation };
