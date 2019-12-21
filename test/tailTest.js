const { formatContent, selectLast10Lines } = require("../src/tailLib");
const assert = require("assert");

describe("formatContent", function() {
  it("should format the content in appropriate form", function() {
    let actual = formatContent(["aa", "bb", "cc", "dd"]);
    let expected = "aa\nbb\ncc\ndd";
    assert.strictEqual(actual, expected);
  });
});

describe("selectLast10Lines", function() {
  it("should give last 10 lines of the given content", function() {
    let actual = selectLast10Lines({
      content: "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm",
      noOfLines: 10
    });
    let expected = ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
    assert.deepStrictEqual(actual, expected);
  });
});
