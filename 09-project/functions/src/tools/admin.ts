const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const config = require("./config");

const firebase = require("firebase");

const firebase_initializedApp = firebase.initializeApp(config);

module.exports = { admin, db, firebase_initializedApp };