const formatContent = function(last10Lines) {
  return last10Lines.join("\n");
};

const selectLast10Lines = function(contentAndNoOfLines) {
  const last10Lines = contentAndNoOfLines.content
    .split("\n")
    .slice(-contentAndNoOfLines.noOfLines);
  return last10Lines;
};

module.exports = { formatContent, selectLast10Lines };
