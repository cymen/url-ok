'use strict';

var parser = require('argv-parser'),
    two_minutes_in_ms = 2 * 60 * 1000;

module.exports = parser.parse(process.argv, {
  rules: {
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
