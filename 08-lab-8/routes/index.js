var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CCPS 530 - Fall 2020 - Lab 8 - Express and MongoDB' });
});

module.exports = router;
