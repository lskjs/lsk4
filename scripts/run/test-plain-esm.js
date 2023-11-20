#!/usr/bin/env node

import fs from 'node:fs';
// eslint-disable-next-line no-console
console.log('Plain es6 -- OK', fs.readFileSync(new URL(import.meta.url).pathname, 'utf8'));
