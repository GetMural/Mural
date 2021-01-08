const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const cookieParser = require('cookie-parser');
const debug = require('debug')('mural-new:server');
const electron = require('electron');
const express = require('express');
const favicon = require('serve-favicon');
const http = require('http');
const hogan = require('hogan-express');
const logger = require('morgan');
const path = require('path');

// routes
const routeIndex = require('./routes/index');
const routeEditor = require('./routes/editor');
const routePreview = require('./routes/preview');
const routePublic = require('./routes/public');
const routePreferences = require('./routes/preferences');
const routeUpload = require('./routes/upload');

(function () {
  const app = express();
  const USER_DATA_FOLDER = electron.app.getPath('userData');

  // Setup node_modules for templates
  app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.engine('html', hogan);
  app.set('view engine', 'html');
  app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json({ limit: '500mb' }));
  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(USER_DATA_FOLDER)));
  app.use(busboy()); // for file upload

  // load routes
  app.use('/', routeIndex);
  app.use('/preview', routePreview);
  app.use('/editor', routeEditor);
  app.use('/public', routePublic);
  app.use('/preferences', routePreferences);
  app.use('/upload', routeUpload);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
    });
  });

  /**
   * Get port from environment and store in Express.
   */

  const port = process.env.MURAL_PORT || 3000;
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

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

    const bind = typeof port === 'string'
      ? `'Pipe ', ${port}`
      : `'Port ', ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        // eslint-disable-next-line no-console
        console.error(`${bind}, ${' requires elevated privileges'}`);
        process.exit(1);
        // break;
      case 'EADDRINUSE':
        // eslint-disable-next-line no-console
        console.error(`${bind}, ${' is already in use'}`);
        process.exit(1);
        // break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? `'pipe ', ${addr}`
      : `'port ', ${addr.port}`;
    debug(`${'Listening on '}, ${bind}`);
  }

  module.exports = app;
}());
