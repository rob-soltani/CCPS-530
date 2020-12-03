import * as express from 'express';
const router = express.Router();

const requestIp = require('request-ip');

router.post("/", function (req, res, next) {

    if (!req.User) return res.status(403).json({ error: 'Unauthorized' });

    const IPAddress = requestIp.getClientIp(req) || '141.117.126.20';

    return res
        .status(200)
        .send({ IPAddress: IPAddress });


});

module.exports = router;






