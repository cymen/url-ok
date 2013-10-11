#!/usr/bin/env node

//var urlOk = require('./lib/url-ok.js');
//var pending = urlOk(["http://www.google.com/", "https://www.paypal.com/home", "http://localhost:4001/"], 40);
var pending = require('./lib/status.js')("http://www.google.com/");
pending.done(function(exitCode) {
  process.exit(exitCode);
}, function() {
  process.exit(1);
});
