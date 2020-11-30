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

      var adminDb = db.db("Name").admin();

      adminDb.listDatabases(function (err, result) {
        const DBs = result.databases;

        var DBExists = false;

        for (var i = 0; i < DBs.length; i++) {
          if (DBs[i].name === "BooksInventory") {
            DBExists = true;
          }
        }

        if (!DBExists) {
          db.close();
          res.redirect("/?dbDoesNotExist=true");
          return;
        } else {
          var ActualDB = db.db("BooksInventory")
          ActualDB.dropDatabase(function (err, result) {
            if (err) throw err;
            db.close();
            res.redirect("/?dbDeleted=true");
            return;
          });
        }
      });
    }
  );
});

module.exports = router;
