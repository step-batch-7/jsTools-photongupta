const { formatContent } = require("../src/tailLib");
const assert = require("assert");

describe("formatContent", function() {
  it("should format the content in appropriate form", function() {
    let actual = formatContent(["aa", "bb", "cc", "dd"]);
    let expected = "aa\nbb\ncc\ndd";
    assert.strictEqual(actual, expected);
  });
});
