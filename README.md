
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