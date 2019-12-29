const errorMsg = require('./errorLib');
const { selectLastNLines, getNoOfLines, validateInput } = require('./tailLib');

const loadFile = function(parsedOptions, readFile, displayMsg) {
  const { filePath, noOfLines } = parsedOptions;
  const contentToPrint = { error: '', output: '' };
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      contentToPrint.error = errorMsg.fileNotExists(filePath);
    }
    else {
      contentToPrint.output = selectLastNLines(content, noOfLines);
    }
    return displayMsg(contentToPrint);
  });
};

const readStdin = function(stdin, displayMsg, noOfLines) {
  const contentToPrint = { error: '', output: '' };
  let content = '';
  stdin.on('data', data => {
    content += data;
  });
  stdin.on('end', () => {
    contentToPrint.output = selectLastNLines(content, noOfLines);
    displayMsg(contentToPrint);
  });
};

const parseOptions = function(userOptions) {
  let { length } = userOptions;
  const parsedOptions = {
    filePath: userOptions[ --length ],
    noOfLines: getNoOfLines(userOptions)
  };
  return parsedOptions;
};

const performTail = function(cmdLineArgs, stdin, readFile, displayMsg) {
  const validationMsg = validateInput(cmdLineArgs);
  const parsedOptions = parseOptions(cmdLineArgs);
  if (validationMsg.error) {
    return displayMsg(validationMsg);
  }
  if (parsedOptions.filePath === undefined) {
    readStdin(stdin, displayMsg, parsedOptions.noOfLines);
    return;
  }
  loadFile(parsedOptions, readFile, displayMsg);
};


module.exports = { performTail, parseOptions, loadFile, readStdin };
