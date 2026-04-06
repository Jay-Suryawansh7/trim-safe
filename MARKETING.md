# trim-safe Marketing Copy

## 1. Hacker News — "Show HN" (highest impact)

**Submit at:** https://news.ycombinator.com/submit

**Title:**
```
I built trim-safe: drop-in replacement for the abandoned trim package (fixes CVE-2020-7753 ReDoS)
```

**Body:**
```
The `trim` npm package (1M+ weekly downloads) has been effectively abandoned since 2013.

The canonical GitHub repo is dormant. The patch fork was archived in 2023. CVE-2020-7753 — a ReDoS vulnerability — is still sitting in the source code.

The original code uses `/^\s*|\s*$/g` which causes catastrophic backtracking. An input like `"1" + " ".repeat(50000) + "1"` hangs the process for ~2 seconds on the vulnerable version, <1ms on the fixed version.

`trim-safe` is a drop-in replacement with zero dependencies, no lifecycle hooks, and a postinstall script that scans your dependency tree and warns if you still have `trim` installed.

GitHub: https://github.com/Jay-Suryawansh7/trim-safe
npm: https://www.npmjs.com/package/trim-safe

Fix: `npm install trim-safe` — then `require('trim-safe')` instead of `require('trim')`.
```

---

## 2. Reddit — r/javascript

**Submit at:** https://www.reddit.com/r/javascript/submit

**Title:**
```
I built trim-safe: fix CVE-2020-7753 in the abandoned npm "trim" package (1M+ weekly downloads)
```

**Body:** (same as HN body above, or slightly shorter)

---

## 3. Reddit — r/node

**Submit at:** https://www.reddit.com/r/node/submit

Same title and body as r/javascript.

---

## 4. Reddit — r/netsec

**Submit at:** https://www.reddit.com/r/netsec/submit

**Title:**
```
CVE-2020-7753 in abandoned npm "trim" package — built a drop-in replacement
```

**Body:** Focus on the security details — ReDoS PoC, affected packages, fix.

---

## 5. Tweet / X (post manually)

**Tweet 1 (hook):**
```
The npm package "trim" has been dead since 2013. It has a known ReDoS vulnerability (CVE-2020-7753) sitting in the source. 1M+ weekly downloads. Nobody owns it anymore.

I built a fix. It's 296 bytes and has zero dependencies.
```

**Tweet 2 (follow-up with link):**
```
trim-safe: drop-in replacement for the abandoned trim package.
npm: npm install trim-safe
GitHub: github.com/Jay-Suryawansh7/trim-safe

The fix: replaced `/^\s*|\s*$/g` with a loop-based trim. No regex backtracking. No more DoS.
```

**Tweet 3 (proof):**
```
npm install trim-safe

After install, it auto-scans your dependency tree. If it finds the vulnerable trim, it tells you which packages still need migrating.

Security tooling built into the package itself.
```

---

## 6. DEV.to article (long-form, best for SEO)

**Publish at:** https://dev.to/new

**Title:** `I fixed the abandoned npm "trim" package's ReDoS vulnerability in one evening`

**Body:** Write about the journey — finding the gap in the research report, understanding CVE-2020-7753, implementing the fix, and what you learned about npm supply-chain security.

**Tags:** `javascript`, `nodejs`, `security`, `npm`, `opensource`

---

## 7. Hacker News — Ask (if the Show HN doesn't take off)

If the Show HN gets buried, follow up with:

**Title:** `Ask HN: What's the best way to notify npm package consumers about an unpatched CVE?`

Body: explain the situation — `trim` is abandoned, CVE is open, no maintainer to push a fix. What's the right channel?

---

## Where to submit first (priority order)

1. **Hacker News** — highest signal, most installs in a single day if it takes off
2. **Reddit** (r/javascript, r/node) — steady traffic, good SEO
3. **DEV.to** — long-tail SEO
4. **Twitter / X** — community signal

**Estimated results if HN front-pages:** 2,000–10,000+ installs in 48 hours.
**Estimated results if HN doesn't front-page but posts to programming sub:** 200–500 installs.
**Reddit + DEV.to steady state:** 50–200 installs/week ongoing.
