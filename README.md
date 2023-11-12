# TODO

- [ ] Add uvu in `lsk run test`
- [ ] Fix `lsk run test:watch`
- [ ] Add `lsk run test:coverage` in `lsk run test`
- [ ] Add more test for test coverage
- [ ] Move cli-utils to separate packages
- [ ] Think about publishing and semver
- [ ] make rsync & copy
- [ ] change `@lskjs/log` to `pino`, `lsk log`` to pino-pretty

# Notes


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