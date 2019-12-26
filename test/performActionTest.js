const { performTail, parseOptions, loadFile } = require("../src/performAction");
const assert = require("chai").assert;

describe("loadFile", function() {
  it("should load the content of given file", function() {
    const userOptions = { filePath: "path", noOfLines: 10 };
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback(null, "h\nhow\nare");
    };
    const displayMsg = function(message) {
      assert.deepStrictEqual(message.output, "h\nhow\nare");
      assert.deepStrictEqual(message.error, "");
    };
    loadFile(userOptions, reader, displayMsg);
  });

  it("should give error if the file is not present", function() {
    const userOptions = { filePath: "path", noOfLines: 10 };
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback("err", null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, "");
      assert.strictEqual(
        message.error,
        `tail: ${userOptions.filePath}: No such file or directory`
      );
    };
    loadFile(userOptions, reader, displayMsg);
  });
});

describe("performTail", function() {
  it("should perform tail operation if given file is present", function() {
    const userOptions = ["path"];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback(null, "hi");
    };
    const displayMsg = function(message) {
      assert.deepStrictEqual(message.output, "hi");
      assert.strictEqual(message.error, "");
    };
    performTail(userOptions, reader, displayMsg);
  });

  it("should perform tail operation if given file is present", function() {
    const userOptions = ["path"];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback("err", null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, "");
      assert.strictEqual(
        message.error,
        `tail: path: No such file or directory`
      );
    };
    performTail(userOptions, reader, displayMsg);
  });

  it("should give error when option is not valid", function() {
    const userOptions = ["-path"];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback("err", null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, "");
      assert.strictEqual(
        message.error,
        `tail: illegal option -- path\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
      );
    };
    performTail(userOptions, reader, displayMsg);
  });

  it("should give error when argument of -n option is invalid", function() {
    const userOptions = ["-n", "r", "path"];
    const reader = function(filePath, encoding, callback) {
      assert.strictEqual(filePath, "path");
      assert.strictEqual(encoding, "utf8");
      callback("err", null);
    };
    const displayMsg = function(message) {
      assert.strictEqual(message.output, "");
      assert.strictEqual(message.error, `tail: illegal offset -- r`);
    };
    performTail(userOptions, reader, displayMsg);
  });
});

describe("parseOptions", function() {
  it("should give the object containing filePath, no. of lines even if option is not given", function() {
    assert.deepStrictEqual(parseOptions(["a.txt"]), {
      filePath: "a.txt",
      noOfLines: 10
    });
  });

  it("should give the object containing filePath, no. of lines ", function() {
    assert.deepStrictEqual(parseOptions(["-n", "3", "a.txt"]), {
      filePath: "a.txt",
      noOfLines: 3
    });
  });
});
