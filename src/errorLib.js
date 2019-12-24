const fileNotExists = function(fileName) {
  return `tail: ${fileName}: No such file or directory`;
};

const invalidOption = function(option) {
  return `tail: illegal option -- ${option.slice(
    1
  )}\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
};

const illegalCount = function(count) {
  return `tail: illegal offset -- ${count}`;
};

module.exports = { fileNotExists, invalidOption, illegalCount };
