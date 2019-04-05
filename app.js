(function () {
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var debug = require('debug')('mural-new:server');
    var http = require('http');
    var busboy = require('connect-busboy');
    var app = express();
    const electron = require('electron');
    const USER_DATA_FOLDER = electron.app.getPath('userData');

    // Setup node_modules for templates
    app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('hogan-express'));
    app.set('view engine', 'html');
    app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '500mb'}));
    app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(USER_DATA_FOLDER)));
    app.use(busboy()); // for file upload

    // load routes
    app.use('/', require('./routes/index'));
    app.use('/preview', require('./routes/preview'));
    app.use('/editor', require('./routes/editor'));
    app.use('/public', require('./routes/public'));
    app.use('/preferences', require('./routes/preferences'));
    app.use('/upload', require('./routes/upload'));

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

    /**
     * Get port from environment and store in Express.
     */

    var port = process.env.MURAL_PORT || 3000;
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    var server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }

    module.exports = app;
}());
