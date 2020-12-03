import * as express from 'express';
const router = express.Router();

router.post("/", function (req, res, next) {

    return res
        .status(200)
        .json({ GoogleReCaptchaSiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY});

});

module.exports = router;






