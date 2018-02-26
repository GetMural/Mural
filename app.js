(function () {
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var app = express();
    app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))

    // Setup node_modules for templates
    app.use('/tools', express.static('node_modules'));

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('hogan-express'));
    app.set('view engine', 'html');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // load routes
    app.use('/', require('./routes/index'));
    app.use('/preview', require('./routes/preview'));
    app.use('/editor', require('./routes/editor'));
    app.use('/data', require('./routes/data'));
    app.use('/public', require('./routes/public'));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error', {
            message: err.message
        });
    });

    module.exports = app;
}());
