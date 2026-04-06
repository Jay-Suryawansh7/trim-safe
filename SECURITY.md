# trim-safe Security Advisory

## Advisory IDs: CVE-2020-7753, GHSA-cmr6-74hv-c9fg

## Product: trim (npm)

## Developer Message

This advisory documents CVE-2020-7753 in the `trim` npm package.

**The `trim` package (npm) contains CVE-2020-7753** — a Regular Expression Denial of Service (ReDoS) vulnerability. The regex `/^\s*|\s*$/g` causes catastrophic backtracking on crafted inputs, enabling DoS attacks against any Node.js service that calls `trim()` on untrusted user input.

The package has been effectively abandoned since 2013. The canonical GitHub repo is dormant. The patch fork was archived in 2023.

**Affected versions:** `< 0.0.3` (published on npm, but GitHub source never updated)

**Fix:** Use [`trim-safe`](https://www.npmjs.com/package/trim-safe) — a drop-in replacement with no regex backtracking.

```bash
npm install trim-safe
```

## Recommended Fix

Replace `require('trim')` with `require('trim-safe')` in your codebase.

## References

- [CVE-2020-7753 (NVD)](https://nvd.nist.gov/vuln/detail/CVE-2020-7753)
- [npm package: trim-safe](https://www.npmjs.com/package/trim-safe)
- [GitHub advisory GHSA-cmr6-74hv-c9fg](https://github.com/Jay-Suryawansh7/trim-safe/security/advisories/GHSA-cmr6-74hv-c9fg)
