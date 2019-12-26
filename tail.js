const { readFile } = require("fs");
const { performTail } = require("./src/performAction");

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const displayMsg = function(contentToPrint) {
    const { output, error } = contentToPrint;
    process.stdout.write(output);
    process.stderr.write(error);
  };
  performTail(cmdLineArgs, readFile, displayMsg);
};

main();
