const errorMsg = require('./errorLib');
const {selectLastNLines, getNoOfLines, validateInput} = require('./tailLib');

const loadFile = function(parsedOptions, readFile, onCompletion) {
  const {filePath, noOfLines} = parsedOptions;
  const contentToPrint = {error: '', output: ''};
  readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      contentToPrint.error = errorMsg.fileNotExists(filePath);
    }
    else {
      contentToPrint.output = selectLastNLines(content, noOfLines);
    }
    return onCompletion(contentToPrint);
  });
};

const readStdin = function(stdin, onCompletion, noOfLines) {
  stdin.setEncoding('utf8');
  const contentToPrint = {error: '', output: ''};
  let content = '';
  stdin.on('data', ( data) => {
    content += data;
  });
  stdin.on('end', () => {
    contentToPrint.output = selectLastNLines(content, noOfLines);
    onCompletion(contentToPrint);
  });
};

const parseOptions = function(userOptions) {
  let {length} = userOptions;
  const parsedOptions = {
    filePath: userOptions[ --length ],
    noOfLines: getNoOfLines(userOptions)
  };
  return parsedOptions;
};

const performTail = function(cmdLineArgs, {stdin, readFile}, onCompletion) {
  const validationMsg = validateInput(cmdLineArgs);
  const parsedOptions = parseOptions(cmdLineArgs);
  if (validationMsg.error) {
    return onCompletion(validationMsg);
  }
  if (parsedOptions.filePath === undefined) {
    readStdin(stdin, onCompletion, parsedOptions.noOfLines);
    return;
  }
  loadFile(parsedOptions, readFile, onCompletion);
};

module.exports = {performTail, parseOptions, readStdin};
