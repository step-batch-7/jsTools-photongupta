const fileNotExists = function(fileName) {
  return `tail: ${fileName}: No such file or directory`;
};

const invalidOption = function(option) {
  const sliceFrom = 1;
  const invalidOption = option.slice(sliceFrom);
  const errorMsg = `tail: illegal option -- ${invalidOption}`;
  const usage = ' tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]';
  return {error: `${errorMsg}\nusage:${usage}`, output: ''};
};

const illegalCount = function(count) {
  return {error: `tail: illegal offset -- ${count}`, output: ''};
};

module.exports = {fileNotExists, invalidOption, illegalCount};
