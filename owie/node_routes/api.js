exports.api = function(req, res) {
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