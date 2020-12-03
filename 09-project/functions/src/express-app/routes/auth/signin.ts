import * as express from 'express';
const router = express.Router();
const axios = require('axios');

const { firebase_initializedApp, db } = require("../../../tools/admin");

const {
    validateLoginData,
} = require("../../../tools/validators");

import { IIndexable } from '../../../intefaces/IIndexable';

const ProcessRequest = (req: express.Request, res: express.Response, next: express.NextFunction, user: IIndexable) => {

    const { valid, errors } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    firebase_initializedApp
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data: any) => {
            return data.user.getIdToken();
        })
        .then((Token: any) => {

            const UserID = user.email;

            db.doc(`/users/${UserID}`)
                .get()
                .then((doc: any) => {
                    if (doc.exists) {
                        const FirstName = doc.data().firstName;
                        const LastName = doc.data().lastName;
                        const Email = doc.data().email;

                        return res.json({ Token, FirstName, LastName, Email }).status(200);
                    }
                    else {
                        return res.status(400).json({ error: "Unable to find user information." });
                    }
                })
                .catch((err: any) => {
                    console.error(err);
                    return res.status(500).json({ error: "Unable to get user information." });
                });

        })
        .catch((err: any) => {
            // console.error(err);
            // auth/wrong-password
            // auth/user-not-user
            return res
                .status(403)
                .json({ error: "Wrong credentials, please try again" });
        });
}

router.post("/", function (req, res, next) {

    const user = {
        email: req.body.Email || '',
        password: req.body.Password || '',
        captcha: req.body.ReCaptchaValue || '',
    };

    if (!user.email.length) {
        return res
            .status(403)
            .json({ error: "User email is missing" });
    }

    if (!user.password.length) {
        return res
            .status(403)
            .json({ error: "User password is missing" });
    }

    if (!user.captcha.length) {
        return res
            .status(403)
            .json({ error: "ReCaptchavalue is missing" });
    }

    let ReCaptcha_URL: string = 'https://www.google.com/recaptcha/api/siteverify?';

    ReCaptcha_URL = ReCaptcha_URL + 'secret=' + process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
    ReCaptcha_URL = ReCaptcha_URL + '&response=' + user.captcha;

    axios({
        method: "post",
        url: ReCaptcha_URL,
    })
        .then((AxiosRes: any) => {
            const statusCode = AxiosRes.status;

            if (statusCode === 200) {

                if (AxiosRes.data.success === true) {
                    return ProcessRequest(req, res, next, user);
                }
                else {
                    return res
                        .status(400)
                        .json({ error: "ReCaptcha verification: your response failed verification." });
                }

            }
            else {
                return res
                    .status(400)
                    .json({ error: "ReCaptcha verification: response error." });
            }
        })
        .catch((err: any) => {

            return res
                .status(400)
                .json({ error: "ReCaptcha verification: error connecting." });

        })

});

module.exports = router;





