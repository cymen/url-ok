'use strict';

var parser = require('argv-parser'),
    one_second = 1000,
    two_minutes_in_ms = 2 * 60 * one_second;

module.exports = parser.parse(process.argv, {
  rules: {
    debug: {
        type: Boolean
    },
    interval: {
      type: Number,
      value: function(interval, parsed, tool) {
        return interval * 1000 || one_second;
      }
    },
    timeout: {
      type: Number,
      value: function(timeout, parsed, tool) {
        return timeout * 1000 || two_minutes_in_ms;
      }
    },
    verbose: {
      type: Boolean
    }
  }
});
