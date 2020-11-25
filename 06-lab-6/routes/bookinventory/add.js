var express = require("express");
var router = express.Router();
var fs = require("fs");

router.post("/", function (req, res, next) {
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

  const DataFilePath = "data/books.json";

  fs.readFile(DataFilePath, function (err, data) {
      
    if (err) throw err;

    var json = JSON.parse(data);

    json.push(TheNewBook);

    console.log(json)

    fs.writeFileSync( DataFilePath, JSON.stringify(json) )

    res.render("bookAdded", { book: TheNewBook });

  });

});

router.get("/", function (req, res, next) {
  res.render("addBook", {
    title: "CCPS 530 - Fall 2020 - Lab 6 - Express and NodeJS - Add a Book",
  });
});

module.exports = router;
