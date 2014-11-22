var express = require('express')

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');


var app = express();



module.exports = app;

// require('./node_models/main_model.js');
// require('./node_controllers/main_controller.js');

// var mongoose = require('mongoose'), Message = mongoose.model('Message');


app.use('/js', express.static('./js'));
app.use('/static/js', express.static('./static/js'));
app.use('/static/css', express.static('./static/css'));
app.use('/', express.static(__dirname + '/views'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views')
app.set('view engine', 'html');

app.use('/', routes);


//app.use('/users', users)

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




app.listen(8080);
