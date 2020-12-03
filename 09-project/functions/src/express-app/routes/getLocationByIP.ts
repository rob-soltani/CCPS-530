import * as express from 'express';
const router = express.Router();
const axios = require('axios');

const validate = require('ip-validator');

const requestIp = require('request-ip');

const { db } = require("../../tools/admin");

router.post("/", function (req, res, next) {

    if (!req.User) return res.status(403).json({ error: 'Unauthorized' });

    const RequestingIPAddress = requestIp.getClientIp(req) || '0.0.0.0';

    const IPAddress = req.body.IPAddress;

    if (IPAddress === undefined || IPAddress === null) {
        return res.status(400).json({ error: 'IP Address Missing' })
    }


    if (!(/^\d+$/.test(IPAddress.replace(/\./g, '')))) {
        return res.status(400).json({ error: 'Invalid IP Address.' })
    }


    if (!validate.ipv4(IPAddress)) {
        return res.status(400).json({ error: 'Invalid IP Address.' })
    }

    const IPFind_APIKey = process.env.IP_FIND_API_KEY;

    const URL = 'https://api.ipfind.com/?ip=' + IPAddress + '&auth=' + IPFind_APIKey;

    axios
        .get(URL)
        .then((AxiosRes: any) => {
            const statusCode = AxiosRes.status;

            if (statusCode === 200) {

                db.collection("users").doc(req.User.Email).collection("requests").add({
                    IPAddress: IPAddress,
                    RequestingIPAddress: RequestingIPAddress,
                    APIData: AxiosRes.data
                })
                .then(() => {
                    return res
                    .status(200)
                    .send(AxiosRes.data);
                })                       

            }
            else {
                return res
                    .status(400)
                    .send({ error: "IPFind.com Error." });
            }
        })
        .catch((error: any) => {

            if (error.response.data.error) {
                return res
                    .status(400)
                    .json({ error: error.response.data.error });
            }
            else {
                return res
                    .status(400)
                    .json({ error: "Error connecting to IPFind.com." });
            }

        })

});

module.exports = router;






