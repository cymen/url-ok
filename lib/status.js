'use strict';

var http = require('http'),
    https = require('https'),
    promise = require('promise'),
    options = require('./options'),
    successCode = 200;

module.exports = function(url, interval) {
  return new promise(function(resolve, reject) {
    var parsedUrl = require('url').parse(url),
        protocol = (parsedUrl.protocol === 'http:') ? http : https,
        request;
    parsedUrl.method = (protocol === http) ? 'HEAD' : 'GET';
    interval = interval || options.parsed.interval;

    var makeRequest = function() {
      if (options.parsed.debug) {
        console.log('DEBUG: requesting', url, '(interval: ' + interval + 'ms)');
      }
      request = protocol
        .request(parsedUrl, function(response) {
          if (options.parsed.verbose) {
            console.log(response.statusCode, url);
          }

          if (response.statusCode === successCode) {
            resolve(response.statusCode);
          }
        });

      request.on('error', function(error) {
        if (options.parsed.debug) {
          console.log('DEBUG: error', url, error.toString());
        }
      });

      request.setTimeout(interval);

      request.end();

      return request;
    };

    setInterval(function() {
      request.abort();
      makeRequest();
    }, interval);

    makeRequest();
  });
};
