fileNotExists = function(fileName) {
  return `tail: ${fileName}: No such file or directory`;
};
invalidOption = function(option) {
  return `tail: illegal option -- ${option}
    usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
};
illegalCount = function(count) {
  return `tail: illegal offset -- ${count}`;
};

module.exports = { fileNotExists, invalidOption, illegalCount };
