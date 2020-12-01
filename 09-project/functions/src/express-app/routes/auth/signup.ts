import * as express from 'express';
const router = express.Router();

const { db, firebase_initializedApp } = require("../../../tools/admin");


const {
    validateSignupData,
} = require("../../../tools/validators");


router.post("/", function (req, res, next) {

    const newUser = {
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        password: req.body.Password,
        confirmPassword: req.body.ConfirmPassword,
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    let token: string, userId: string;

    db.doc(`/users/${newUser.email}`)
        .get()
        .then((doc: any) => {
            if (doc.exists) {
                return res.status(400).json({ email: "This email is already taken" });
            } else {
                return firebase_initializedApp
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data: any) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken: any) => {
            token = idToken;
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            };
            return db.doc(`/users/${newUser.email}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err: any) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(400).json({ email: "Email is already is use" });
            } else {
                return res
                    .status(500)
                    .json({ general: "Something went wrong, please try again" });
            }
        });

});

module.exports = router;





// // Add user details
// exports.addUserDetails = (req, res) => {
//     let userDetails = reduceUserDetails(req.body);

//     db.doc(`/users/${req.user.handle}`)
//         .update(userDetails)
//         .then(() => {
//             return res.json({ message: "Details added successfully" });
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.status(500).json({ error: err.code });
//         });
// };


// // Get any user's details
// exports.getUserDetails = (req, res) => {
//     let userData = {};
//     db.doc(`/users/${req.params.handle}`)
//         .get()
//         .then((doc) => {
//             if (doc.exists) {
//                 userData.user = doc.data();
//                 return db
//                     .collection("screams")
//                     .where("userHandle", "==", req.params.handle)
//                     .orderBy("createdAt", "desc")
//                     .get();
//             } else {
//                 return res.status(404).json({ errror: "User not found" });
//             }
//         })
//         .then((data) => {
//             userData.screams = [];
//             data.forEach((doc) => {
//                 userData.screams.push({
//                     body: doc.data().body,
//                     createdAt: doc.data().createdAt,
//                     userHandle: doc.data().userHandle,
//                     userImage: doc.data().userImage,
//                     likeCount: doc.data().likeCount,
//                     commentCount: doc.data().commentCount,
//                     screamId: doc.id,
//                 });
//             });
//             return res.json(userData);
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.status(500).json({ error: err.code });
//         });
// };



// // Get own user details
// exports.getAuthenticatedUser = (req, res) => {
//     let userData = {};
//     db.doc(`/users/${req.user.handle}`)
//         .get()
//         .then((doc) => {
//             if (doc.exists) {
//                 userData.credentials = doc.data();
//                 return db
//                     .collection("likes")
//                     .where("userHandle", "==", req.user.handle)
//                     .get();
//             }
//         })
//         .then((data) => {
//             userData.likes = [];
//             data.forEach((doc) => {
//                 userData.likes.push(doc.data());
//             });
//             return db
//                 .collection("notifications")
//                 .where("recipient", "==", req.user.handle)
//                 .orderBy("createdAt", "desc")
//                 .limit(10)
//                 .get();
//         })
//         .then((data) => {
//             userData.notifications = [];
//             data.forEach((doc) => {
//                 userData.notifications.push({
//                     recipient: doc.data().recipient,
//                     sender: doc.data().sender,
//                     createdAt: doc.data().createdAt,
//                     screamId: doc.data().screamId,
//                     type: doc.data().type,
//                     read: doc.data().read,
//                     notificationId: doc.id,
//                 });
//             });
//             return res.json(userData);
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.status(500).json({ error: err.code });
//         });
// };




// // Upload a profile image for user
// exports.uploadImage = (req, res) => {
//     const BusBoy = require("busboy");
//     const path = require("path");
//     const os = require("os");
//     const fs = require("fs");

//     const busboy = new BusBoy({ headers: req.headers });

//     let imageToBeUploaded = {};
//     let imageFileName;
//     // String for image token
//     let generatedToken = uuid();

//     busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
//         console.log(fieldname, file, filename, encoding, mimetype);
//         if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
//             return res.status(400).json({ error: "Wrong file type submitted" });
//         }
//         // my.image.png => ['my', 'image', 'png']
//         const imageExtension = filename.split(".")[filename.split(".").length - 1];
//         // 32756238461724837.png
//         imageFileName = `${Math.round(
//             Math.random() * 1000000000000
//         ).toString()}.${imageExtension}`;
//         const filepath = path.join(os.tmpdir(), imageFileName);
//         imageToBeUploaded = { filepath, mimetype };
//         file.pipe(fs.createWriteStream(filepath));
//     });
//     busboy.on("finish", () => {
//         admin
//             .storage()
//             .bucket()
//             .upload(imageToBeUploaded.filepath, {
//                 resumable: false,
//                 metadata: {
//                     metadata: {
//                         contentType: imageToBeUploaded.mimetype,
//                         //Generate token to be appended to imageUrl
//                         firebaseStorageDownloadTokens: generatedToken,
//                     },
//                 },
//             })
//             .then(() => {
//                 // Append token to url
//                 const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
//                 return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
//             })
//             .then(() => {
//                 return res.json({ message: "image uploaded successfully" });
//             })
//             .catch((err) => {
//                 console.error(err);
//                 return res.status(500).json({ error: "something went wrong" });
//             });
//     });
//     busboy.end(req.rawBody);
// };



// exports.markNotificationsRead = (req, res) => {
//     let batch = db.batch();
//     req.body.forEach((notificationId) => {
//         const notification = db.doc(`/notifications/${notificationId}`);
//         batch.update(notification, { read: true });
//     });
//     batch
//         .commit()
//         .then(() => {
//             return res.json({ message: "Notifications marked read" });
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.status(500).json({ error: err.code });
//         });
// };
