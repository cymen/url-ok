'use strict';

var http = require('http'),
    https = require('https'),
    promise = require('promise');

module.exports = function(url) {

  return new promise(function(resolve, reject) {
    var parsedUrl = require('url').parse(url),
        protocol = (parsedUrl.protocol === 'http:') ? http : https;
    parsedUrl.method = (protocol === http) ? 'HEAD' : 'GET';

    var makeRequest = function() {
      var request = protocol
        .request(parsedUrl, function(response) {
          resolve(response.statusCode);
        });

      request.on('error', function(error) {
        setTimeout(function() {
          makeRequest();
        }, 500);

      })

      request.end();

      request.setTimeout(500);
    };

    makeRequest();
  });
};
