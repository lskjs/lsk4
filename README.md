# Lsk.js v4 Manifesto

## Principles

- Focus on performance 
- TypeScript only
- ESM first
- Minimal dependencies
- CI deploy with semver
- 100% Test coverage with benchmarks
- Easy understnading DX (developer experience)
- Basic docs for all packages

## Tech stack
- TypeScript - tsup (esbuild)
- ESM - tsm?
- Namespaces - PNPM
- Test - UVU
- Test coverage - C8
- CI - GitHub actions
- Semver - NX or ... ???????
- CLI - Yargs
- Deployment - 

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
- [ ] Make rsync & copy commands
- [ ] Add `lsk create` with templates
- [ ] Change `@lskjs/log` to `pino`, `lsk log`` to pino-pretty
- [ ] Rewrite `lsk run` commands to Yargs commands

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