#!/usr/bin/env node

var accumulator = require('./lib/accumulator');
    failure = 1,
    options = require('./lib/options'),
    success = 0,
    timeout = options.parsed.timeout;

if (options.parsed.verbose) {
  console.log('Waiting up to', Math.round(timeout/1000), 'seconds for response(s).');
}

accumulator(options.parsed.argv.remain, timeout)
  .done(function() {
    if (options.parsed.verbose) {
      console.log('Received successful response for all URLs.');
    }
    process.exit(success);
  }, function() {
    if (options.parsed.verbose) {
      console.log('At least one URL failed to respond!');
    }
    process.exit(failure);
  });
