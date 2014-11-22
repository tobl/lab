'use strict';
var request = require('request');
var bodyParser = require('body-parser');

// search for a specific message
module.exports = function(config, app, log) {

  app.use(bodyParser.json());

  app.get('/api/message/:id', function(req, res) {
    log.info('in searching message with id=' + req.params.id);
    request({
      method: 'GET',
      url: config.messagedb + req.params.id,
      qs: {
        key: JSON.stringify(req.query.q),
        headers: '"Content-Type": "application/json"',
        reduce: false,
        include_docs: true
      }
    }, function(err, couchRes, body) { // couldn't connect to CouchDB
      if (err) {
        res.json(502, {
          error: "bad_gateway",
          reason: err.code
        });
        return;
      } // CouchDB couldn't process our request
      if (couchRes.statusCode !== 200) {
        res.json(couchRes.statusCode, JSON.parse(body));
        return;
      } // send back simplified documents we got from CouchDB
      var messages = {};
      res.json(JSON.parse(body));
    });
  });

  app.post('/api/message', function(req, res) {
    log.info('saving message');
    log.info('url=' + config.messagedb + "message=" + req.body.message +
      " sdate=" + req.body.date);

    var options = {
      uri: config.messagedb,
      method: 'POST',
      json: {
        message: req.body.message,
        date: req.body.date
      }
    };

    request(options, function(err, couchRes, body) {
      if (err) {
        couchRes.json(502, {
          error: "bad_gateway",
          reason: err.code
        });
        return;
      }
      if (couchRes.statusCode == 200) {
        log.info("data successfully saved, id=" + body.id) // Print the shortened url.
        res.json(body);
      } else {
        log.info("could not save data, status_code=" + couchRes.statusCode)
        log.info(body);
        res.json(couchRes.statusCode, body);
      }
      return;
    });
  });
}
