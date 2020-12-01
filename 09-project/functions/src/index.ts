import * as functions from 'firebase-functions';

const app = require('./express-app/app');

exports.app = functions.https.onRequest(app);