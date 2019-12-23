const { parseArguments } = require("./src/tailLib");
const { getFileOperations } = require("./src/fileOperations");
const { performTailOperation } = require("./src/performAction");

const main = function() {
  try {
    const userOptions = parseArguments(process.argv);
    const fileOperations = getFileOperations(userOptions);
    console.log(performTailOperation(userOptions, fileOperations));
  } catch (err) {
    console.error(err.message);
  }
};

main();
