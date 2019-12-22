const fs = require("fs");
const { getFileOperations } = require("../src/utilities");
const assert = require("assert");

describe("getFileOperations", function() {
  it("should give an object that will contain all required tools for file processing.", function() {
    let actual = getFileOperations("path");
    let expected = {
      path: "path",
      encoding: "utf8",
      reader: fs.readFileSync,
      existsFile: fs.existsSync
    };
    assert.deepStrictEqual(actual, expected);
  });
});
