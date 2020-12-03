import * as express from 'express';
const router = express.Router();

router.post("/", function (req, res, next) {

    if (!req.User) return res.status(403).json({ error: 'Unauthorized' });
    
    return res
        .status(200)
        .json({ getGoogleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY });

});

module.exports = router;






