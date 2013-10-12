'use strict';

var accumulator = require('../lib/accumulator.js'),
    nock = require('nock'),
    successCode = 200;

describe('accumulator', function() {
    afterEach(function() {
        nock.cleanAll();
    });

    it('resolves successfully when all URLs are successful', function(done) {
        var urls = ['http://localhost:32001/', 'http://localhost:32002'],
            thirty_seconds_in_ms = 30 * 1000;

        urls.forEach(function(url) {
            nock(url)
                .head('/')
                .reply(successCode);
        });

        var pending = accumulator(urls, thirty_seconds_in_ms);

        pending.done(function() {
            done();
        });
    });

    it('errors out if one of the URLs is not successful', function(done) {
        var urls = ['http://localhost:32001/', 'http://localhost:32002'],
            one_second_in_ms = 1 * 1000;

        urls.forEach(function(url) {
            nock(url)
                .head('/')
                .reply(successCode);
        });

        urls.push('http://not.going.to.respond.localhost:32003/');

        var pending = accumulator(urls, one_second_in_ms);

        pending.done(
            function() {},
            function() {
                done();
            });
    });
});
