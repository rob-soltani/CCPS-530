var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var MongoDB_URL = require("../../dbUrl");

router.post("/", async function (req, res, next) {
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const date = req.body.date;
  const website = req.body.website;

  const TheNewBook = {};

  TheNewBook.title = title;
  TheNewBook.author = author;
  TheNewBook.publisher = publisher;
  TheNewBook.date = date;
  TheNewBook.website = website;

  MongoClient.connect(
    MongoDB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("BooksInventory");

      dbo.collection("Books").insertOne(TheNewBook, function (err, MongoRes) {
        if (err) throw err;
        db.close();
        res.render("bookAdded", { book: TheNewBook });
        return;
      });
    }
  );
});

router.get("/", function (req, res, next) {
  res.render("addBook", {
    title: "Add a Book - CCPS 530 - Fall 2020 - Lab 8 - Express and MongoDB - Add a Book",
  });
});

module.exports = router;
