const functions = require('firebase-functions');

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
} = require('./handler/domins');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require('./handler/user');

//common
app.get('/domains', getAllDomains);
app.get('/domain/:domainId', getDomain);

//auth user
app.get('/userDomains', FBAuth, getAuthUserAllDomains);
app.post('/domain', FBAuth, postOneDomain);
app.post('/domian/:domainId/bid', FBAuth, bidOnDomain);

//blogPost
app.post('/blogPost', FBAuth, postOneBlog);
app.get('/blogPosts', getAllBlogPosts);
app.get('/blogPost/:postId', FBAuth, getAuthUserBlogPost);
app.post('/blogPost/:postId/update', FBAuth, postUpdateBlog);
app.get('/post/:postId/like/:trueOrFalse', FBAuth, likePost);

app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user/', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
