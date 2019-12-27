const assert = require("chai").assert;
const { selectLastNLines, validateInput } = require("../src/tailLib");

describe("selectLastNLines", function() {
  it("should give array of last 10 lines of the given content", function() {
    const content = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm\n";
    const noOfLines = "10";
    const expected = "d\ne\nf\ng\nh\ni\nj\nk\nl\nm";
    assert.deepStrictEqual(selectLastNLines(content, noOfLines), expected);
  });

  it("should give array of lines of content if the content contains less than 10 line", function() {
    content = "c\nd\ne\nf\n";
    noOfLines = "10";
    const expected = "c\nd\ne\nf";
    assert.deepStrictEqual(selectLastNLines(content, noOfLines), expected);
  });
});

describe("validateInput", function() {
  it("should give an object containing error if options are invalid", function() {
    const cmdLineArgs = ["node", "tail.js", "-e", "a.txt"];
    assert.deepStrictEqual(validateInput(cmdLineArgs), {
      error:
        "tail: illegal option -- e\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]",
      output: ""
    });
  });

  it("should give an object containing error if argument of -n option in not valid", function() {
    const cmdLineArgs = ["node", "tail.js", "-n", "r", "a.txt"];
    assert.deepStrictEqual(validateInput(cmdLineArgs), {
      error: "tail: illegal offset -- r",
      output: ""
    });
  });

  it("should give an object containing null error if the input is valid", function() {
    const cmdLineArgs = ["node", "tail.js", "-n", "3", "a.txt"];
    assert.deepStrictEqual(validateInput(cmdLineArgs), {
      error: null
    });
  });
});
