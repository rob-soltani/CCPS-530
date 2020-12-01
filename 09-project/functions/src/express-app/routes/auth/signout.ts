import * as express from 'express';
const router = express.Router();

const { admin } = require("../../../tools/admin");

router.post("/", function (req, res, next) {

    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }

    req.User = {
        ID: "",
        Email: "",
        FirstName: "",
        LastName: "",
        Token: {},
    };

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: any) => {
            req.User.Token = decodedToken;
            return req.User.Token.uid;
        })
        .then((uid: string) => {
            console.log(uid);
            return admin
                .auth()
                .revokeRefreshTokens(uid);
        })
        .then(() => {
            return res.status(200).json({ message: "Successfully Signed Out." });
        })
        .catch((err: any) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        });

});

module.exports = router;