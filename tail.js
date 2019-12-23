const { parseArguments, performTailOperation } = require("./src/tailLib");
const { getFileOperations } = require("./src/fileOperations");

const main = function() {
  const userOptions = parseArguments(process.argv);
  const fileOperations = getFileOperations(userOptions);
  try {
    console.log(performTailOperation(userOptions, fileOperations));
  } catch (err) {
    console.error(err.message);
  }
};

main();
