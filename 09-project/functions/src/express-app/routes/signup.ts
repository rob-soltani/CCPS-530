import * as express from 'express';
const router = express.Router();


router.get("/", function (req, res, next) {

    res.json({Message: 'Sign Up'}).status(200).end();
    return;

});

module.exports = router;
