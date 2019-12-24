const fs = require("fs");
const assert = require("chai").assert;
const {
  getFileOperations,
  doesFileExist,
  loadFile
} = require("../src/fileOperations");

describe("getFileOperations", function() {
  it("should give an object that will contain all required tools for file processing.", function() {
    const actual = getFileOperations();
    const expected = {
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
      encoding: "utf8",
      existsFile: existsFile
    };
    assert.isTrue(doesFileExist(fileOperation, "path"));
  });

  it("should not validate if given file does not exists", function() {
    const existsFile = function(filePath) {
      assert.strictEqual(filePath, "path");
      return false;
    };
    const fileOperation = {
      encoding: "utf8",
      existsFile: existsFile
    };
    assert.isFalse(doesFileExist(fileOperation, "path"));
  });
});

describe("loadFile", function() {
  it("should read given file and give the content of file", function() {
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "hello";
    };
    const fileOperation = {
      encoding: "utf8",
      reader: read
    };

    assert.strictEqual(loadFile(fileOperation, "path"), "hello");
  });

  it("should give empty string if file is empty", function() {
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "";
    };
    const fileOperation = {
      encoding: "utf8",
      reader: read
    };
    assert.strictEqual(loadFile(fileOperation, "path"), "");
  });
});
