const { readFileSync, existsSync } = require("fs");
const { performTail } = require("./src/performAction");

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const fileOperations = {
    encoding: "utf8",
    reader: readFileSync,
    existsFile: existsSync
  };
  const contentToPrint = performTail(cmdLineArgs, fileOperations);
  process.stdout.write(contentToPrint.output);
  process.stderr.write(contentToPrint.error);
};

main();
