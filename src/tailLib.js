const parseArguments = function(cmdLineArgs) {
  const userOptions = {
    filePath: undefined,
    option: [],
    noOfLines: 10
  };
  if (cmdLineArgs[2].includes("-")) {
    userOptions.option.push(cmdLineArgs[2]);
    userOptions.noOfLines = cmdLineArgs[cmdLineArgs.indexOf("-n") + 1];
    if (isInputValid(userOptions)) {
      userOptions.filePath = cmdLineArgs[cmdLineArgs.indexOf("-n") + 2];
      return userOptions;
    }
    generateError(
      `tail: illegal offset -- ${cmdLineArgs[cmdLineArgs.indexOf("-n") + 1]}`
    );
  }
  userOptions.filePath = cmdLineArgs[2];
  return userOptions;
};

const isInputValid = function(cmdLineArgs) {
  if (cmdLineArgs.option[0] == "-n") {
    return Number.isInteger(+cmdLineArgs.noOfLines);
  }
  return true;
};

const generateError = function(errorMessage) {
  throw new Error(errorMessage);
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

module.exports = {
  formatContent,
  selectLast10Lines,
  parseArguments,
  isInputValid,
  generateError
};
