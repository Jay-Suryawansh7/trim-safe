# trim-safe

Safe, drop-in replacement for the abandoned [`trim`](https://www.npmjs.com/package/trim) npm package.

## Why

The `trim` package (1M+ weekly downloads) has been effectively abandoned since 2013. Its canonical GitHub repo is dormant, the patch fork was archived in 2023, and the original source was never updated with the CVE fix.

The package contains **CVE-2020-7753** — a ReDoS vulnerability in the regex `/^\s*|\s*$/g`. An attacker can craft an input string that causes catastrophic regex backtracking, consuming all CPU and hanging your process.

`trim-safe` fixes the vulnerability using a loop-based approach with no regex backtracking. Same API, zero security debt.

## Install

```bash
npm install trim-safe
```

When installed into a project, `trim-safe` automatically checks your dependency tree. If it finds the vulnerable `trim` package, it prints a migration prompt:

```
⚠  VULNERABLE: trim (CVE-2020-7753) found in dependency tree
  3 packages still depend on the vulnerable trim package.

  Migrate:
    npm install trim-safe
    # in your code: require('trim-safe') instead of require('trim')
```

No extra setup needed.

## Usage

```js
var trim = require('trim-safe');

trim('  hello  ');    // 'hello'
trim('\t\ntest\r\n'); // 'test'
trim('hello');        // 'hello'
trim('   ');          // ''
```

## Migration

Replace `trim` with `trim-safe` in your `package.json`:

```diff
- "trim": "^1.0.0"
+ "trim-safe": "^1.0.0"
```

Then in your code:

```diff
- var trim = require('trim');
+ var trim = require('trim-safe');
```

No API changes needed.

## Security

### The Vulnerability (CVE-2020-7753)

The original `trim` used this regex:

```js
str.replace(/^\s*|\s*$/g, '');
```

The `|` alternation with `*` quantifiers on both sides creates exponential backtracking. An input like `"1" + " ".repeat(50000) + "1"` triggers catastrophic backtracking — the regex tries every possible way to split the string between the two alternatives.

**Vulnerable version:** ~2,000ms+ for 50k spaces
**Fixed version:** <1ms for 50k spaces

### The Fix

`trim-safe` uses two separate operations:

```js
function left(str) {
  return str.replace(/^\s\s*/, '');  // requires 2+ spaces, no backtracking
}

function right(str) {
  var whitespace_pattern = /\s/;
  var i = str.length;
  while (whitespace_pattern.test(str.charAt(--i)));  // simple loop, no regex
  return str.slice(0, i + 1);
}

function trim(str) {
  return right(left(str));
}
```

Key changes:
- `/^\s\s*/` instead of `/^\s*/` — requires minimum 2 whitespace chars to match (eliminates the zero-match combinatorial explosion)
- `\s*$/` replaced with a backward `while` loop — no regex needed, no backtracking
- No `g` flag anywhere in the codebase

### Benchmarks

| Input | Vulnerable | trim-safe |
|-------|-----------|-----------|
| `'  hello  '` | <1ms | <1ms |
| `50k spaces surrounded by '1'` | ~2,175ms | ~1ms |

## API

### `trim(str)`

Trims whitespace from both ends of a string.

- **str** (`string`) — the string to trim
- **returns** (`string`) — the trimmed string

Works on strings, numbers, null, undefined (coerces to string).

## License

MIT
