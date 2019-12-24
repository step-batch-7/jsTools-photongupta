const assert = require("chai").assert;
const {
  formatContent,
  selectLast10Lines,
  validateInput
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
      content: "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\nm\n",
      noOfLines: 10
    });
    const expected = "d\ne\nf\ng\nh\ni\nj\nk\nl\nm\n";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give array of lines of content if the content contains less than 10 line", function() {
    const actual = selectLast10Lines({
      content: "c\nd\ne\nf\n",
      noOfLines: 10
    });
    const expected = "c\nd\ne\nf\n";
    assert.deepStrictEqual(actual, expected);
  });
});
