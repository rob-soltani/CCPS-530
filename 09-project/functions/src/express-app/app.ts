const createError = require('http-errors');
import * as express from 'express';
const path = require('path');
const cookieParser = require('cookie-parser');
var cors = require('cors')

import HttpException from '../classes/HttpException';

require('dotenv').config();

// import { IIndexable } from '../intefaces/IIndexable';

// const path = require('path');



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const FBAuth = require('./routes/auth/fbAuth');

// Routers
const signUpRouter = require('./routes/auth/signup');
app.use('/api/signup', signUpRouter);

const signinRouter = require('./routes/auth/signin');
app.use('/api/signin', signinRouter);

const signoutRouter = require('./routes/auth/signout');
app.use('/api/signout', signoutRouter);

const getLocationByIPRouter = require('./routes/getLocationByIP');
app.use('/api/getLocationByIP', FBAuth, getLocationByIPRouter);

const getLocationAutomaticallyRouter = require('./routes/getLocationAutomatically');
app.use('/api/getLocationAutomatically', FBAuth, getLocationAutomaticallyRouter);


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
    res.json({ errorMessage: err.message, errorStatus: err.status, errorStack: err.stack });
});

module.exports = app;