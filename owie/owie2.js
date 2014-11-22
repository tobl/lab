#!/usr/bin/env node --harmony

'use strict';

// global variables
var bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'owie/node_controllers'
  }),
  express = require('express'),
  app = express();

// CouchDB configuration
var config = {
  messagedb: 'http://localhost:5984/messages/'
};

// include node routes
require('./lib/message.js')(config, app, log);

// set static file paths
app.use('/js', express.static('./js'));
app.use('/static/js', express.static('./static/js'));
app.use('/static/css', express.static('./static/css'));
app.use('/', express.static(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views')
app.set('view engine', 'html');

// start listening
app.listen(3000, function() {
  log.info("ready on port 3000");
});
