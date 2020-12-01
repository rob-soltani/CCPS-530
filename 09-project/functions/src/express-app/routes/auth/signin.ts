import * as express from 'express';
const router = express.Router();

const { firebase_initializedApp } = require("../../../tools/admin");


const {
    validateLoginData,
} = require("../../../tools/validators");


router.post("/", function (req, res, next) {

    const user = {
        email: req.body.Email,
        password: req.body.Password,
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    firebase_initializedApp
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data: any) => {
            return data.user.getIdToken();
        })
        .then((token: any) => {
            return res.json({ token });
        })
        .catch((err: any) => {
            console.error(err);
            // auth/wrong-password
            // auth/user-not-user
            return res
                .status(403)
                .json({ general: "Wrong credentials, please try again" });
        });

});

module.exports = router;





