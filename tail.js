const { stdout, stderr } = require("process");
const { getFileOperations } = require("./src/fileOperations");
const { performTailOperation } = require("./src/performAction");

const main = function() {
  const userOptions = process.argv.slice(2);
  const fileOperations = getFileOperations();
  const contentToPrint = performTailOperation(userOptions, fileOperations);
  stdout.write(contentToPrint.output);
  stderr.write(contentToPrint.error);
};

main();
