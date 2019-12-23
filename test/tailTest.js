const assert = require("chai").assert;
const {
  formatContent,
  selectLast10Lines,
  parseArguments,
  isInputValid
} = require("../src/tailLib");

describe("formatContent", function() {
  it("should format the content in appropriate form", function() {
    const actual = formatContent(["aa", "bb", "cc", "dd"]);
    const expected = "aa\nbb\ncc\ndd";
    assert.strictEqual(actual, expected);
  });
});

describe("selectLast10Lines", function() {
  it("should give array of last 10 lines of the given content", function() {
    const actual = selectLast10Lines({
      content: "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm",
      noOfLines: 10
    });
    const expected = "d\ne\nf\ng\nh\ni\nj\nk\nl\nm";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give array of lines of content if the content contains less than 10 line", function() {
    const actual = selectLast10Lines({
      content: "c\nd\ne\nf",
      noOfLines: 10
    });
    const expected = "c\nd\ne\nf";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseArguments", function() {
  it("should give the object containing filePath, no. of lines and options", function() {
    assert.deepStrictEqual(parseArguments(["node", "tail.js", "a.txt"]), {
      filePath: "a.txt",
      noOfLines: 10,
      option: []
    });
  });
  it("should give the object containing filePath, no. of lines and options", function() {
    assert.deepStrictEqual(
      parseArguments(["node", "tail.js", "-n", "5", "a.txt"]),
      {
        filePath: "a.txt",
        noOfLines: "5",
        option: ["-n"]
      }
    );
  });
  it("should throw an error if the no of lines is not specified after the -n option", function() {
    assert.throws(
      () => parseArguments(["node", "tail.js", "-n", "a.txt"]),
      Error
    );
  });
});

describe("isInputValid", function() {
  it("should validate if the argument of -n option is a integer", function() {
    assert.isTrue(
      isInputValid({ option: ["-n"], noOfLines: 4, filePath: "a.txt" })
    );
  });

  it("should not validate if the argument of -n option is not a integer ", function() {
    assert.isFalse(
      isInputValid({ option: ["-n"], noOfLines: "Joha", filePath: "a.txt" })
    );
  });

  it("should validate if only file is given ", function() {
    assert.isTrue(
      isInputValid({ option: [], noOfLines: 10, filePath: "a.txt" })
    );
  });
});
