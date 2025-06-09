PREPEND HTTPS
- added normalizeUrl utility to LinkForm.utils.ts
- normalizeUrl trims whitespace, removes trailing slashes, adds https:// if missing

FAVICON FETCHING
- removed backend dependency for favicon fetching
- implemented frontend-only favicon logic using google’s favicon API
- favicon is always enabled by default

FAVICON CACHING
- added favicon cache utility in src/utils/favicon.ts