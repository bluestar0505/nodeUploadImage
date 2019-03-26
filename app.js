var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mustacheExpress = require('mustache-express');
//var multer  = require('multer');


var index = require('./controllers/index');
var images = require('./controllers/images');
var user = require('./controllers/user');
var auth = require('./controllers/auth');
var authMiddleware = require('./middleware/auth');

var app = express();

// view engine setup
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors({
  origin: process.env.SERVER_ORIGIN_URL,
  credentials: true
}));

//app.use(multer({ dest: __dirname + '/public/tmp'}));

app.use('/', index);
app.use('/images', images);
app.use('/user', authMiddleware.ensureLoggedIn, /*authMiddleware.allowAccess,*/ user);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || res.statusCode || 500);
  res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
