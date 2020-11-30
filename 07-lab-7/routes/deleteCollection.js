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
          var dbo = db.db("BooksInventory");

          dbo.listCollections({ name: "Books" }).next(function (err, collinfo) {
            if (collinfo) {
              dbo.collection("Books").drop(function (err, delOK) {
                if (err) throw err;
                db.close();

                res.redirect("/?collectionDeleted=true");
                return;
              });
            } else {
              res.redirect("/?collectionDoesNotExist=true");
              return;
            }
          });
        }
      });
    }
  );
});

module.exports = router;
