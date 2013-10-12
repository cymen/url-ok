'use strict';

var http = require('http'),
    https = require('https'),
    promise = require('promise'),
    options = require('./options');

module.exports = function(url) {
  return new promise(function(resolve, reject) {
    var parsedUrl = require('url').parse(url),
        protocol = (parsedUrl.protocol === 'http:') ? http : https;
    parsedUrl.method = (protocol === http) ? 'HEAD' : 'GET';

    var makeRequest = function() {
      var request = protocol
        .request(parsedUrl, function(response) {
          if (options.parsed.verbose) {
            console.log(response.statusCode, url);
          }
          resolve(response.statusCode);
        });

      request.on('error', function(error) {
        setTimeout(function() {
          makeRequest();
        }, 500);
      });

      request.setTimeout(500);

      request.end();
    };

    makeRequest();
  });
};
