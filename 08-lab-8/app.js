var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

var BookInventoryAddRouter = require('./routes/bookinventory/add');
var BookInventoryListRouter = require('./routes/bookinventory/list');
var BookInventoryListTableRouter = require('./routes/bookinventory/list_table');
var insertSampleBooksRouter = require('./routes/insertSampleBooks');
var deleteCollectionRouter = require('./routes/deleteCollection');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bookinventory/add', BookInventoryAddRouter);
app.use('/bookinventory/list', BookInventoryListRouter);
app.use('/bookinventory/list_table', BookInventoryListTableRouter);
app.use('/insertSampleBooks', insertSampleBooksRouter);
app.use('/deleteCollection', deleteCollectionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
