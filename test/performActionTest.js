const { performTailOperation } = require("../src/performAction");
const assert = require("chai").assert;

describe("performTailOperation", function() {
  it("should perform tail operation if given file is present", function() {
    const userOptions = {
      filePath: "path",
      noOfLines: 10
    };
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
      path: "path",
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    assert.strictEqual(
      performTailOperation(userOptions, fileOperation),
      "a\nb"
    );
  });

  it("should throw the error if given file is not present", function() {
    const userOptions = {
      filePath: "path",
      noOfLines: 10
    };
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "a\nb";
    };
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    const fileOperation = {
      path: "path",
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    assert.throws(
      () => performTailOperation(userOptions, fileOperation),
      Error
    );
  });
});
