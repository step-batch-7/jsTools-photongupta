const fileNotExists = function(fileName) {
  return { error: `tail: ${fileName}: No such file or directory`, output: "" };
};

const invalidOption = function(option) {
  return {
    error: `tail: illegal option -- ${option.slice(
      1
    )}\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`,
    output: ""
  };
};

const illegalCount = function(count) {
  return { error: `tail: illegal offset -- ${count}`, output: "" };
};

module.exports = { fileNotExists, invalidOption, illegalCount };
