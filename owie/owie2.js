#!/usr/bin/env node --harmony

'use strict';

var bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: 'owie/node_controllers'
  }),
  express = require('express'),
  app = express();

var config = {
  messagedb: 'http://localhost:5984/messages/'
};


// load node controllers
// require('./lib/message-search.js')(config, app, log);
// require('./lib/message-save.js')(config, app, log);
require('./lib/message.js')(config, app, log);

app.use('/js', express.static('./js'));
app.use('/static/js', express.static('./static/js'));
app.use('/static/css', express.static('./static/css'));
app.use('/', express.static(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views')
app.set('view engine', 'html');

app.listen(3000, function() {
  log.info("ready on port 3000");
});
