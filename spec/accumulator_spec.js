'use strict';

var accumulator = require('../lib/accumulator.js'),
    nock = require('nock');

describe('accumulator', function() {
    afterEach(function() {
        nock.cleanAll();
    });

    it('resolves successfully when all urls are successful', function(done) {
        var url = "http://localhost:32768/",
            statusCode = 200,
            thirty_seconds_in_ms = 30 * 1000;

        nock(url)
            .head('/')
            .reply(statusCode);

        var url_b = "http://localhost:32769/";
        nock(url_b)
            .head('/')
            .reply(statusCode);

        var pending = accumulator([url, url_b], thirty_seconds_in_ms);

        pending.done(function() {
            done();
        });
    });
});
