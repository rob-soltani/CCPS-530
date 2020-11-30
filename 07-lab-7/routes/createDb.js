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

      var adminDb = db.db().admin();

      adminDb.listDatabases(function (err, result) {
        const DBs = result.databases;

        for (var i = 0; i < DBs.length; i++) {
          if (DBs[i].name === "BooksInventory") {
            res.redirect("/?dbExists=true");
            return;
          }
        }

        var dbo = db.db("BooksInventory");

        dbo.createCollection(
          "TempCollection",
          function (err, MongoCreateCollectionResponse) {
            if (err) throw err;

            var TempObject = { name: "TempObject" };

            dbo
              .collection("TempCollection")
              .insertOne(TempObject, function (err, MongoResponse) {
                if (err) throw err;

                db.close();

                res.redirect("/?dbCreated=true");
                return;

              });
          }
        );
      });
    }
  );
});

module.exports = router;
