# Lsk.js v4 Manifesto

## Principles

- TypeScript
- ESM first
- 100% Test coverage with benchmarks
- Minimal dependencies
- CI deploy with semver
- Docs

## Tech stack
- TypeScript - tsup - esbuild
- ESM - (tsm)
- PNPM namespaces
- UVU tests
- C8 test coverage
- NX or ... ???????

## Not used
- No JS & Babel
- No LERNA
- NO MAGIC!


## TODO

- [ ] Add uvu in `lsk run test`
- [ ] Fix `lsk run test:watch`
- [ ] Add `lsk run test:coverage` in `lsk run test`
- [ ] Add more test for test coverage
- [ ] Move cli-utils to separate packages
- [ ] Think about publishing and semver
- [ ] make rsync & copy
- [ ] change `@lskjs/log` to `pino`, `lsk log`` to pino-pretty

## Notes for future docs


```json
  "eslintConfig": {
    "extends": "@lskjs/eslint-config",
    "settings": {
      "import/resolver": {
        "typescript": {
          "project": [
            "tsconfig.json",
            "apps/*/tsconfig.json"
          ]
        }
      }
    }
  },
```