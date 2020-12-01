const createError = require('http-errors');
import * as express from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');

import HttpException from './classes/HttpException';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routers
const signUpRouter = require('./routes/signup');
app.use('/signup', signUpRouter);

app.get("/", function (req, res, next) {

    res.json({Message: 'Home'}).status(200).end();
    return;

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;