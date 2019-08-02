const path = require('path');
require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/exercise/users');
var usersSolutionRouter = require('./routes/solution/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userssample', usersSolutionRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Handling errors
app.use((error, req, res, next) => {
  console.warn(
    JSON.stringify({
      method: req.method,
      url: req.url,
      message: error.message,
      error,
      stack: error.stack,
      params: req.params,
      headers: req.headers,
      querys: req.query
    })
  );
  try {
    return res.status(500).send({ errors: error.message });
  } catch (error) {
    return next(error);
  }
});

module.exports = app;
