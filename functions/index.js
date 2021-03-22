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
  getAllAuctions,
  postOneAuction,
  getAuction,
  bidOnAuction,
  getAuthUserAllAuctions,
  activeDeactiveAuction,
  deleteAuction,
} = require('./handler/auctions');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  markNotificationsRead,
} = require('./handler/user');

//common
app.get('/auctions/:limitAuctions', getAllAuctions); //done
app.get('/auction/:auctionId', getAuction); //done

//auth user domain
app.get('/userAuctions', FBAuth, getAuthUserAllAuctions); //done
app.post('/auction', FBAuth, postOneAuction); //done
app.post('/auction/:auctionId/bid', FBAuth, bidOnAuction);
app.get('/auction/:auctionId/activeDeactive', FBAuth, activeDeactiveAuction); //done
app.get('/auction/:auctionId/delete', FBAuth, deleteAuction); //done

//blogPost
app.post('/blogPost', FBAuth, postOneBlog);
app.get('/blogPosts/:limitPosts', getAllBlogPosts);
app.get('/blogPost/:postId', getAuthUserBlogPost);
app.post('/blogPost/:postId/update', FBAuth, postUpdateBlog);
app.get('/post/:postId/like', FBAuth, likePost);

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
      createdAt: new Date(),
      type: 'bids',
      read: false,
    };

    return db
      .doc(`/auctions/${snapshot.after.data().auctionId}`)
      .get()
      .then((doc) => {
        if (doc.data().bids > 0) {
          notificaionData.sender = snapshot.after.data().userId;
          notificaionData.auctionId = snapshot.after.data().auctionId;
          notificaionData.message = `New bid added ${
            snapshot.after.data().bidAmount
          } on ${doc.data().auctionName}`;
          notificaionData.bidId = snapshot.after.id;
          const batch = db.batch();

          return db
            .collection('bids')
            .where('auctionId', '==', snapshot.after.data().auctionId)
            .where('userId', '!=', snapshot.after.data().userId)
            .get()
            .then((data) => {
              console.log(data);
              data.forEach((doc) => {
                notificaionData.recipient = doc.data().userId;
                console.log(doc.data().userId);
                console.log(notificaionData);
                var docRef = db.collection('notifications').doc(); //automatically generate unique id
                batch.set(docRef, notificaionData);
              });
              return batch.commit();
            });
        } else return false;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });
