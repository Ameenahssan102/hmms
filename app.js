var createError = require('http-errors');
var compression = require('compression');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
app.use(compression());
var indexRouter = require('./config/index');
const {createRoutes} = require("./routes/app.routes");
const auth = require('./middleware/auth');
require('./config/connection');
require('dotenv').config();




// view engine setup
global.__basedir = __dirname;
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));


app.use(cors({
  origin: "*",
}))

// -->
app.use('/', indexRouter);
// createRoutesNoAuth(app);
app.use(auth);
createRoutes(app);

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
