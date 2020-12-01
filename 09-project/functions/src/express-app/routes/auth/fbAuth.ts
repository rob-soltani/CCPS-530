import * as express from 'express';

const { admin, db } = require("../../../tools/admin");


module.exports = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('No token found');
    return res.status(403).json({ AuthError: 'Unauthorized' });
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
      console.log(0)
      return db
        .collection('users')
        .where('userId', '==', req.User.Token.uid)
        .limit(1)
        .get();
    })
    .then((data: any) => {
      if (data.docs.length !== 0) {
        req.User.ID = req.User.Token.uid;
        req.User.FirstName = data.docs[0].data().firstName;
        req.User.LastName = data.docs[0].data().lastName;
        req.User.Email = data.docs[0].data().email;
        return next();
      }
      else {
        return res.status(400).json({ AuthError: "User with token does not exist" });
      }
    })
    .catch((err: any) => {
      console.error('Error while verifying token ', err);
      return res.status(403).json({ AuthError: err });
    });
};

