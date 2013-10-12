'use strict';

var status = require('../lib/status.js'),
    nock = require('nock'),
    promise = require('promise'),
    successCode = 200;

describe('status', function() {
    afterEach(function() {
        nock.cleanAll();
    });

    it('returns a promise', function() {
        expect(status() instanceof promise).toBe(true);
    });

    it('makes a HEAD request for http', function(done) {
        var url = "http://localhost:32768/";

        nock(url)
            .head('/')
            .reply(successCode);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(successCode);
            done();
        });
    });

    it('makes a GET request for https', function(done) {
        var url = "https://localhost:32768/";

        nock(url)
            .get('/')
            .reply(successCode);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(successCode);
            done();
        });
    });

    it('keeps trying until it gets a response', function(done) {
        var url = "http://localhost:32768/";

        setTimeout(function() {
            nock(url)
                .head('/')
                .reply(successCode);
        }, 1000);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(successCode);
            done();
        });
    });

    it('keeps trying if it gets a non-successCode response', function(done) {
        var url = "http://localhost:32999/";

        nock(url)
            .head('/')
            .reply(500)
            .head('/')
            .reply(successCode);

        var pending = status(url);

        pending.done(function(code) {
            expect(code).toBe(successCode);
            done();
        });
    });
});
