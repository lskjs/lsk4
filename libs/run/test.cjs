#!/usr/bin/env node
const { argv } = require('yargs').completion('completion', (current, argv, done) => {
  // setTimeout(() => {
  done(['apple', 'banana']);
  // }, 500);
});
