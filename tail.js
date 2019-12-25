const { getFileOperations } = require("./src/fileOperations");
const { performTail } = require("./src/performAction");

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const fileOperations = getFileOperations();
  const contentToPrint = performTail(cmdLineArgs, fileOperations);
  process.stdout.write(contentToPrint.output);
  process.stderr.write(contentToPrint.error);
};

main();
