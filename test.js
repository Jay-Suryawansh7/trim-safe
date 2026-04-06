var assert = require('assert');
var trim = require('./index.js');

console.log('Running trim-safe test suite...\n');

assert.strictEqual(trim('  hello  '), 'hello', 'basic trim');
assert.strictEqual(trim('\t\nhello\t\n'), 'hello', 'tabs and newlines');
assert.strictEqual(trim(''), '', 'empty string');
assert.strictEqual(trim('   '), '', 'whitespace only');
assert.strictEqual(trim('hello'), 'hello', 'no whitespace');
assert.strictEqual(trim('\r\n\t  test  \r\n\t'), 'test', 'mixed whitespace');
assert.strictEqual(trim('  hello \n world  '), 'hello \n world', 'internal whitespace preserved');
assert.strictEqual(trim('a'), 'a', 'single char');
assert.strictEqual(trim(' a '), 'a', 'single word with spaces');
assert.strictEqual(trim('\u00a0hello\u00a0'), 'hello', 'non-breaking space');

console.log('Standard tests passed.\n');

console.log('ReDoS attack test (must complete in <100ms)...');
var start = Date.now();
trim('1' + ' '.repeat(50000) + '1');
var elapsed = Date.now() - start;
console.log('Attack input (50k spaces): ' + elapsed + 'ms');
assert.ok(elapsed < 100, 'ReDoS attack took ' + elapsed + 'ms — should be <100ms. FIX FAILED.');
console.log('ReDoS test passed.\n');

console.log('All tests passed!');
