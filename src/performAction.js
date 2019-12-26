const errorMsg = require("./errorLib");
const { selectLastNLines, getNoOfLines, validateInput } = require("./tailLib");

const loadFile = function(parsedOptions, readFile, displayMsg) {
  const { filePath, noOfLines } = parsedOptions;
  const contentToPrint = { error: "", output: "" };
  readFile(filePath, "utf8", (err, content) => {
    if (err) contentToPrint.error = errorMsg.fileNotExists(filePath);
    else contentToPrint.output = selectLastNLines(content, noOfLines);
    return displayMsg(contentToPrint);
  });
};

const performTail = function(cmdLineArgs, readFile, displayMsg) {
  const validationMsg = validateInput(cmdLineArgs);
  const parsedOptions = parseOptions(cmdLineArgs);
  if (validationMsg.error) {
    return displayMsg(validationMsg);
  }
  result = loadFile(parsedOptions, readFile, displayMsg);
};

const parseOptions = function(userOptions) {
  const parsedOptions = {
    filePath: userOptions[userOptions.length - 1],
    noOfLines: +getNoOfLines(userOptions)
  };
  return parsedOptions;
};

module.exports = { performTail, parseOptions, loadFile };
