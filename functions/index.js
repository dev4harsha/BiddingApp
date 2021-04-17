const functions = require('firebase-functions');
const { db } = require('./util/admin');

const express = require('express');
const app = express();
const FBAuth = require('./util/fbAuth');

const http = require('http');
const socketIo = require('socket.io');

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
  endAuction,
  deleteAuction,
  updateAuction,
  userAuctionsHistory,
  makePayment,
  userAuctionsSell,
  userAuctionsBuy,
  bidAuctions,
  getUserAuction,
  deliveryAuction,
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

//auth user auctions
app.get('/bidAuctions', FBAuth, bidAuctions);
app.get('/userAuctions', FBAuth, getAuthUserAllAuctions); //done
app.post('/auction', FBAuth, postOneAuction); //done
app.post('/auction/:auctionId/bid', FBAuth, bidOnAuction);
app.post('/auction/update', FBAuth, updateAuction);
app.get('/auction/:auctionId/endAuction', FBAuth, endAuction); //done
app.get('/auction/:auctionId/delete', FBAuth, deleteAuction); //done
app.get('/auctionsSell', FBAuth, userAuctionsSell);
app.get('/auctionsBuy', FBAuth, userAuctionsBuy);
app.get('/auction/:auctionId/makePayment', FBAuth, makePayment);
app.get('/auction/userAuction/:auctionId', FBAuth, getUserAuction);
app.get('/auction/:auctionId/delivery/:status', FBAuth, deliveryAuction); //done

//blogPost
app.post('/blogPost', FBAuth, postOneBlog);
app.get('/blogPosts/:limitPosts', getAllBlogPosts);
app.get('/blogPost/:postId', getAuthUserBlogPost);
app.post('/blogPost/:postId/update', FBAuth, postUpdateBlog);
app.get('/post/:postId/like', FBAuth, likePost);

// app.post('/signup', signup);
// app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.createNotificationOnDomain = functions.firestore
  .document('auctions/{auctionId}/bids/{bidId}')
  .onWrite((snapshot, context) => {
    const notificaionData = {
      createdAt: new Date(),
      type: 'bids',
      read: false,
    };

    return db
      .doc(`/auctions/${context.params.auctionId}`)
      .get()
      .then((doc) => {
        if (doc.data().bids > 0) {
          notificaionData.sender = snapshot.after.data().userId;
          notificaionData.auctionId = context.params.auctionId;
          notificaionData.message = `New bid added ${
            snapshot.after.data().bidAmount
          } on ${doc.data().auctionName}`;
          notificaionData.bidId = context.params.bidId;
          const batch = db.batch();

          console.log(doc.data().participents);
          doc.data().participents.forEach((participent) => {
            if (snapshot.after.data().userId != participent) {
              notificaionData.recipient = participent;
              console.log(snapshot.after.data().userId);
              console.log(participent);
              console.log(notificaionData);
              var docRef = db.collection('notifications').doc(); //automatically generate unique id
              batch.set(docRef, notificaionData);
            }
          });
          return batch.commit();
        } else return false;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.api = functions.https.onRequest(app);

// exports.createNotificationOnDomain = functions.firestore
// .document('auctions/{auctionId}/bids/{bidId}')
// .onWrite((snapshot) => {
//   const notificaionData = {
//     createdAt: new Date(),
//     type: 'bids',
//     read: false,
//   };

//   return db
//     .doc(`/auctions/${auctionId}`)
//     .get()
//     .then((doc) => {
//       if (doc.data().bids > 0) {
//         notificaionData.sender = snapshot.after.data().userId;
//         notificaionData.auctionId = auctionId;
//         notificaionData.message = `New bid added ${
//           snapshot.after.data().bidAmount
//         } on ${doc.data().auctionName}`;
//         notificaionData.bidId = snapshot.after.id;
//         const batch = db.batch();

//         return db
//           .collection('bids')
//           .where('auctionId', '==', snapshot.after.data().auctionId)
//           .where('userId', '!=', snapshot.after.data().userId)
//           .get()
//           .then((data) => {
//             console.log(data);
//             data.forEach((doc) => {
//               notificaionData.recipient = doc.data().userId;
//               console.log(doc.data().userId);
//               console.log(notificaionData);
//               var docRef = db.collection('notifications').doc(); //automatically generate unique id
//               batch.set(docRef, notificaionData);
//             });
//             return batch.commit();
//           });
//       } else return false;
//     })
//     .catch((err) => {
//       console.error(err);
//       return;
//     });
// });
