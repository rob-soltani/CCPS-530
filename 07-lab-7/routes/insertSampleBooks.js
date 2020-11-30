var express = require("express");
var router = express.Router();

var MongoClient = require("mongodb").MongoClient;
var MongoDB_URL = require("../dbUrl");

router.get("/", function (req, res, next) {
  MongoClient.connect(
    MongoDB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("BooksInventory");


      var FiveSampleBooks = [
        {
          title: "The Chomsky-Foucault Debate: On Human Nature",
          author: "Noam Chomsky",
          publisher: " The New Press",
          date: "2006",
          website:
            "https://en.wikipedia.org/wiki/Chomsky%E2%80%93Foucault_debate",
        },
        {
          title: "What Kind of Creatures Are We?",
          author: "Noam Chomsky",
          publisher: " Columbia University Press",
          date: "2015",
          website:
            "https://en.wikipedia.org/wiki/Noam_Chomsky_bibliography_and_filmography",
        },
        {
          title: "Deep Work: Rules for Focused Success in a Distracted World",
          author: "Cal Newport",
          publisher: "Grand Central Publishing",
          date: "2016",
          website:
            "https://www.amazon.ca/gp/product/1455586692/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1",
        },
        {
          title: "Getting Things Done: The Art of Stress-Free Productivity",
          author: " David Allen",
          publisher: "Penguin Books",
          date: "2015",
          website:
            "https://www.amazon.ca/gp/product/0143126563/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1",
        },
        {
          title: "Algorithms to Live By: The Computer Science of Human Decisions",
          author: " Brian Christian",
          publisher: "Henry Holt and Co.",
          date: "April 19 2016",
          website:
            "https://www.amazon.ca/Algorithms-Live-Computer-Science-Decisions/dp/1627790365",
        },
      ];

      dbo.collection("Books").insertMany(FiveSampleBooks, function (err, MongoRes) {
        if (err) throw err;
        db.close();
        res.redirect("/?fiveBooksInserted=true");
        return;
      });
    }
  );
});

module.exports = router;
