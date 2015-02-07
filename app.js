'use strict';

// load config + utilities
var config = require('./config');
var _ = require('underscore');

// load express
var express = require('express');
var app = express();

// load express modules
var resource = require('express-resource');

app.get('/', function(req, res) {
	res.send('Hello World!');
});

var server = app.listen(config.app.server.port, function() {
	var name = config.app.name;
	var host = server.address().address;
	var port = server.address().port;
	var env = config.app.env;
	console.log('%s listening at http://%s:%s in %O mode', name, host, port, env);
})
