class Err {
  fileNotExists(fileName) {
    return `tail: ${fileName}: No such file or directory`;
  }
  invalidOption(option) {
    return `tail: illegal option -- ${option}
    usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`;
  }
  illegalCount(count) {
    return `tail: illegal offset -- ${count}`;
  }
}

const err = new Err();

module.exports = { err };
