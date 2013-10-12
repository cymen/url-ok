'use strict';

module.exports = function(urls, timeout) {
  var all = [],
      promise = require('promise'),
      options = require('./options'),
      status = require('./status.js');

  return new promise(function(resolve, reject) {
    urls.forEach(function(url) {
      if (options.parsed.verbose) {
        console.log('Requesting', url);
      }
      all.push(status(url));
    });

    promise.all(all).done(function() {
      resolve();
    }, function() {
      reject();
    });

    setTimeout(function() {
      if (options.parsed.verbose) {
        console.log('Aborting after', Math.round(timeout/1000), 'seconds!');
      }
      reject();
    }, timeout);
  });
};
