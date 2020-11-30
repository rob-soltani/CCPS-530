var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var MongoDB_URL = require("../../dbUrl");

router.get("/", function (req, res, next) {
  MongoClient.connect(
    MongoDB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;

      var dbo = db.db("BooksInventory");

      dbo
        .collection("Books")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          db.close();
          res.json(result);
        });
        
    }
  );
});

module.exports = router;
