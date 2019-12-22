const { parseArguments, performTailOperation } = require("./src/tailLib");

const main = function() {
  const userOptions = parseArguments(process.argv);
  try {
    console.log(performTailOperation(userOptions));
  } catch (err) {
    console.error(err.message);
  }
};

main();
