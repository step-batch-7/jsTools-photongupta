const fs = require("fs");
const { getFileOperations, doesFileExist } = require("../src/utilities");
const assert = require("chai").assert;

describe("getFileOperations", function() {
  it("should give an object that will contain all required tools for file processing.", function() {
    const actual = getFileOperations("path");
    const expected = {
      path: "path",
      encoding: "utf8",
      reader: fs.readFileSync,
      existsFile: fs.existsSync
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("doesFileExists", function() {
  it("should validate if given file exists", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const fileOperation = {
      path: "path",
      encoding: "utf8",
      existsFile: existsFile
    };
    assert.isTrue(doesFileExist(fileOperation));
  });
});
