const { db, admin } = require('../util/admin');
const Config = require('../util/config.js');
const firebase = require('firebase');
firebase.initializeApp(Config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails,
} = require('../util/validators');
exports.signup = (req, res) => {
  //const provider = new firebase.auth.GoogleAuthProvider();
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  const noImg = 'no-img.png';
  let token, userId;

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${Config.storageBucket}/o/${noImg}?alt=media`,
        userId,
      };
      return db.doc(`/users/${userId}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);

      return res.status(400).json({ error: err.message });
    });
};

exports.login = (req, res) => {
  const userCred = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(userCred);
  if (!valid) return res.status(400).json(errors);
  firebase
    .auth()
    .signInWithEmailAndPassword(userCred.email, userCred.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.message });
    });
};

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.uid}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: 'Profile details updated successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.collection('likes')
    .where('userId', '==', req.user.uid)
    .get()
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection('notifications')
        .where('recipient', '==', req.user.uid)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          bidId: doc.data().bidId,
          type: doc.data().type,
          read: doc.data().read,
          domainId: doc.data().domainId,
          message: doc.data().message,
          notificationId: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };

    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        destination: `profileImages/${imageFileName}`,
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
          },
        },
      })
      .then((data) => {
        //return res.json(data);
        // Append token to url
        // console.log(req.user.userId);
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          Config.storageBucket
        }/o/${encodeURIComponent(data[0].metadata.name)}?alt=media`;
        return db.doc(`/users/${req.user.uid}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: 'Profile image changed!' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong' });
      });
  });
  busboy.end(req.rawBody);
};
exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notificationId) => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: 'Notifications marked read' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
