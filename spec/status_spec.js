'use strict';

var status = require('../lib/status.js'),
    nock = require('nock'),
    promise = require('promise');

describe('status', function() {
    afterEach(function() {
        nock.cleanAll();
    });

    it('returns a promise', function() {
        expect(status() instanceof promise).toBe(true);
    });

    it('makes a HEAD request for http', function(done) {
        var url = "http://localhost:32768/",
            statusCode = 200;
        nock(url)
            .head('/')
            .reply(statusCode);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(statusCode);
            done();
        });
    });

    it('makes a GET request for https', function(done) {
        var url = "https://localhost:32768/",
            statusCode = 211;
        nock(url)
            .get('/')
            .reply(statusCode);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(statusCode);
            done();
        });
    });

    it('keeps trying until it gets a response', function(done) {
        var url = "http://localhost:32768/",
            statusCode = 204;

        setTimeout(function() {
            nock(url)
                .head('/')
                .reply(statusCode);
        }, 1000);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(statusCode);
            done();
        });
    });
});
