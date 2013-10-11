#!/usr/bin/env node

var accumulator = require('./lib/accumulator');
    failure = 1,
    pending = accumulator(process.argv.slice(2))
    success = 0;

pending.done(function() {
  process.exit(success);
}, function() {
  process.exit(failure);
});
