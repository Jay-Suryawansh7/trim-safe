module.exports = trim;

function left(str) {
  return str.replace(/^\s\s*/, '');
}

function right(str) {
  var whitespace_pattern = /\s/;
  var i = str.length;
  while (whitespace_pattern.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}

function trim(str) {
  return right(left(str));
}
