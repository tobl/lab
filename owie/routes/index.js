var express = require('express');
var router = express.Router();

var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'owie/controller' });



module.exports = function(app) {
    var messages = require('node_controller/main_controller');
    app.get('ctrl/getmessage', messages.get);
}

router.get('/message/get', function(req, res) {
    log.info('in node_controller=get');
    res.json('controller_msg');
});

router.get('/message/create', function(req, res) {
    log.info('in node_controller=create');
    res.json('controller_msg');
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
