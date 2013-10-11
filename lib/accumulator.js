'use strict';

module.exports = function(urls, timeout) {
  var status = require('./status.js'),
      promise = require('promise'),
      all = [],
      two_minutes_in_ms = 2 * 60 * 1000,
      timeout = timeout || two_minutes_in_ms;

  return new promise(function(resolve, reject) {
    urls.forEach(function(url) {
      all.push(status(url));
    });

    promise.all(all).done(function() {
      resolve();
    }, function() {
      reject();
    });

    setTimeout(function() {
      reject();
    }, timeout);

  });
};
