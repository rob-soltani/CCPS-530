var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {

    const DataFilePath = "data/books.json";

    fs.readFile(DataFilePath, function (err, data) {
        
      if (err) throw err;
  
      res.json(JSON.parse(data));
  
    });

});

module.exports = router;
