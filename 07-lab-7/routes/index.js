var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {

  res.render("index", {
    title: "CCPS 530 - Lab 7",
    dbExists: req.params.dbExists || req.query.dbExists,
    dbCreated: req.params.dbCreated || req.query.dbCreated,
    dbDeleted: req.params.dbDeleted || req.query.dbDeleted,
    dbDoesNotExist: req.params.dbDoesNotExist || req.query.dbDoesNotExist,
    collectionCreated: req.params.collectionCreated || req.query.collectionCreated,
    collectionExists: req.params.collectionExists || req.query.collectionExists,
    collectionDoesNotExist: req.params.collectionDoesNotExist || req.query.collectionDoesNotExist,
    collectionDeleted: req.params.collectionDeleted || req.query.collectionDeleted,
    fiveBooksInserted: req.params.fiveBooksInserted || req.query.fiveBooksInserted,
   });
});

module.exports = router;
