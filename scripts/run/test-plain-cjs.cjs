#!/usr/bin/env node

const fs = require('fs');
// eslint-disable-next-line no-console
console.log('Plain es6 -- OK', fs.readFileSync(__filename, 'utf8'));
