const { performTailOperation, parseOptions } = require("../src/performAction");
const assert = require("chai").assert;

describe("performTailOperation", function() {
  it("should perform tail operation if given file is present", function() {
    const userOptions = ["path"];
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    assert.deepStrictEqual(performTailOperation(userOptions, fileOperation), {
      error: "",
      output: "a\nb"
    });
  });

  it("should perform tail operation according to given number of lines if file is present", function() {
    const userOptions = ["-n", "4", "path"];
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb\nc\nd";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };

    assert.deepStrictEqual(performTailOperation(userOptions, fileOperation), {
      error: "",
      output: "a\nb\nc\nd"
    });
  });

  it("should give error if the argument of -n option is not a number", function() {
    const userOptions = ["-n", "abc", "path"];
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb\nc\nd";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    assert.deepStrictEqual(performTailOperation(userOptions, fileOperation), {
      error: "tail: illegal offset -- abc",
      output: ""
    });
  });

  it("should give error if the option is not valid", function() {
    const userOptions = ["-k", "abc", "path"];
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb\nc\nd";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      reader: read,
      existsFile: existsFile
    };
    assert.deepStrictEqual(performTailOperation(userOptions, fileOperation), {
      error:
        "tail: illegal option -- -k\n    usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]",
      output: ""
    });
  });

  it("should give error if file is not present", function() {
    const userOptions = ["-n", "4", "path"];
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb\nc\nd";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fileOperation = {
      reader: read,
      existsFile: existsFile
    };
    assert.deepStrictEqual(performTailOperation(userOptions, fileOperation), {
      error: "tail: path: No such file or directory",
      output: ""
    });
  });
});

describe("parseOptions", function() {
  it("should give the object containing filePath, no. of lines even if option is not given", function() {
    assert.deepStrictEqual(
      parseOptions("a.txt", ["node", "tail.js", "a.txt"]),
      {
        filePath: "a.txt",
        noOfLines: 10
      }
    );
  });

  it("should give the object containing filePath, no. of lines ", function() {
    assert.deepStrictEqual(
      parseOptions("a.txt", ["node", "tail.js", "-n", "3", "a.txt"]),
      {
        filePath: "a.txt",
        noOfLines: 3
      }
    );
  });
});
