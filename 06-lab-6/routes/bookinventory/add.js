var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('This is the add book POST API endpoint');
});

module.exports = router;
