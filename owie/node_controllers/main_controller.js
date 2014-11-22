var bunyan = require('bunyan');
var log = bunyan.createLogger({name: 'owie/node_controllers'});

exports.app.get('/gaga', function(req, res) {
    log.debug('called node_controller=createmsg');
});

exports.createmsg = function(req, res) {
    log.debug('called node_controller=createmsg');
    var message = new Message();
    message.set('m_id', req.body.msgId);
    message.set('message', req.body.message);
    message.set('date', req.body.date);
    log.info('saving m_id='+req.body.msgId+' message='+req.body.message+' date='+req.body.date);
    word.save(function(err) {
        if (err) {
            log.error('could not save message with m_id='+req.body.msgId);
        } else {
            log.info('message with m_id='+req.body.msgId+' successfully saved');
            res.json(message);
        }
    });
};

exports.getmsg = function(req, res) {
    log.debug('called node_controller=getmsg');
    Message.findOne({message: req.body.msgId})
        .exec(function(err, message) {
            if (!message) {
                log.info('controller=getmsg status=404');
                res.json(404, {err: 'Message not found'});
            } else {
                log.info('controller=getdmsg status=200');
                res.json(message);
            }
        });
};