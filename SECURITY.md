# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in `trim-safe`, please report it via:

1. **GitHub Issues** (preferred for non-critical issues)
2. **Email** — open an issue first and we'll respond within 48 hours

Please do not disclose security vulnerabilities publicly until a fix is available.

## Security Model

`trim-safe` intentionally contains **no external dependencies** — only stdlib JavaScript. The attack surface is zero network calls, zero file reads, and no dynamic code execution.

The package has no `postinstall`, `preinstall`, `prepare`, or any other lifecycle hooks.
