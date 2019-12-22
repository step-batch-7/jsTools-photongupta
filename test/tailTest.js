const { formatContent, selectLast10Lines } = require("../src/tailLib");
const assert = require("assert");

describe("formatContent", function() {
  it("should format the content in appropriate form", function() {
    const actual = formatContent(["aa", "bb", "cc", "dd"]);
    const expected = "aa\nbb\ncc\ndd";
    assert.strictEqual(actual, expected);
  });
});

describe("selectLast10Lines", function() {
  it("should give last 10 lines of the given content", function() {
    const actual = selectLast10Lines({
      content: "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm",
      noOfLines: 10
    });
    const expected = ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
    assert.deepStrictEqual(actual, expected);
  });
});
