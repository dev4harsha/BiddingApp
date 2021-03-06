const functions = require('firebase-functions');
const { db } = require('./util/admin');

const express = require('express');
const app = express();
const FBAuth = require('./util/fbAuth');

const {
  postOneBlog,
  getAllBlogPosts,
  getAuthUserBlogPost,
  postUpdateBlog,
  likePost,
} = require('./handler/blogPost');
const {
  getAllDomains,
  postOneDomain,
  getDomain,
  bidOnDomain,
  getAuthUserAllDomains,
  activeDeactiveDomain,
  deleteDomain,
} = require('./handler/domins');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  markNotificationsRead,
} = require('./handler/user');

//common
app.get('/domains', getAllDomains);
app.get('/domain/:domainId', getDomain);

//auth user domain
app.get('/userDomains', FBAuth, getAuthUserAllDomains);
app.post('/domain', FBAuth, postOneDomain);
app.post('/domian/:domainId/bid', FBAuth, bidOnDomain);
app.get('/domian/:domainId/activeDeactive', FBAuth, activeDeactiveDomain);
app.get('/domian/:domainId/', FBAuth, deleteDomain);

//blogPost
app.post('/blogPost', FBAuth, postOneBlog);
app.get('/blogPosts', getAllBlogPosts);
app.get('/blogPost/:postId', FBAuth, getAuthUserBlogPost);
app.post('/blogPost/:postId/update', FBAuth, postUpdateBlog);
app.get('/post/:postId/like/:trueOrFalse', FBAuth, likePost);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnDomain = functions.firestore
  .document('bids/{id}')
  .onWrite((snapshot) => {
    const notificaionData = {
      createdAt: new Date().toISOString(),
      type: 'bids',
      read: false,
    };

    return db
      .doc(`/domains/${snapshot.after.data().domainId}`)
      .get()
      .then((doc) => {
        if (doc.data().bids > 1) {
          notificaionData.sender = snapshot.after.data().userId;
          notificaionData.domainId = snapshot.after.data().domainId;
          notificaionData.message = `New bid added ${
            snapshot.after.data().bidAmount
          } on ${doc.data().domainname}`;
          notificaionData.bidId = snapshot.after.id;
          const batch = db.batch();
          return db
            .collection('bids')
            .where('domainId', '==', snapshot.after.data().domainId)
            .where('userId', '!=', snapshot.after.data().userId)
            .get()
            .then((data) => {
              data.forEach((doc) => {
                notificaionData.recipient = doc.data().userId;
                console.log(doc.data().userId);
                console.log(notificaionData);
                var docRef = db.collection('notifications').doc(); //automatically generate unique id
                batch.set(docRef, notificaionData);
              });
              return batch.commit();
            });
        } else return flase;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
