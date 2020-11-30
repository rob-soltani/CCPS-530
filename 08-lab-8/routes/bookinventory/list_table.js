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
          res.render("list_table", {
            title: "Books - CCPS 530 - Fall 2020 - Lab 8 - Express and NodeJS - Add a Book",
            books: result
          });

        });
        
    }
  );
});

module.exports = router;
