const { db, admin } = require('../util/admin');
const Config = require('../util/config.js');
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.postOneBlog = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;
  const noImg = 'no-img.png';

  const newPost = {
    createdAt: new Date().toISOString(),
    likes: 0,
    unlikes: 0,
    userId: req.user.uid,
  };

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (!filename.trim()) {
      return res.status(400).json({ error: 'Image not found' });
    }
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    busboy.on(
      'field',
      (
        fieldname,
        val,
        fieldnameTruncated,
        valTruncated,
        encoding,
        mimetype
      ) => {
        newPost[fieldname] = val;
      }
    );
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
        destination: `blogPostImages/${imageFileName}`,
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
        newPost.imageURL = imageUrl;
        return db
          .collection('blogPosts')
          .add(newPost)
          .then((doc) => {
            const resPost = newPost;
            resPost.postId = doc.id;
            res.json(resPost);
          })
          .catch((err) => {
            res.status(500).json({ error: 'blog post creation failed ' });
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: 'something went wrong ' });
      });
  });
  busboy.end(req.rawBody);
};

exports.getAllBlogPosts = (req, res) => {
  db.collection('blogPosts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let blogPosts = [];
      data.forEach((doc) => {
        blogPosts.push({
          postId: doc.id,
          postTitle: doc.data().title,
          postBody: doc.data().post,
          imageURL: doc.data().imageURL,
          likes: doc.data().likes,
          unlikes: doc.data().unlikes,
          userId: doc.data().userId,
        });
      });
      return res.json(blogPosts);
    })
    .catch((err) => console.error(err));
};

exports.getAuthUserBlogPost = (req, res) => {
  let blogPost = {};
  db.doc(`/blogPosts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Blog post not found!' });
      }
      blogPost = doc.data();
      blogPost.postId = doc.id;
    })
    .then(() => {
      return res.json(blogPost);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postUpdateBlog = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers });
  let imageToBeUploaded = {};
  let imageFileName;
  const noImg = 'no-img.png';

  let updatePost = {};
  const updatePostStatus = { imageFound: false };

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    file.on('data', function (data) {
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
        return res.status(400).json({ error: 'Wrong file type submitted' });
      }
      // my.image.png => ['my', 'image', 'png']
      const imageExtension = filename.split('.')[
        filename.split('.').length - 1
      ];
      // 32756238461724837.png
      imageFileName = `${Math.round(
        Math.random() * 1000000000000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };

      file.pipe(fs.createWriteStream(filepath));
      updatePostStatus.imageFound = true;
    });
    file.on('end', function () {
      console.log('File [' + fieldname + '] Finished');
    });
  });
  busboy.on(
    'field',
    (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      updatePost[fieldname] = val;
    }
  );
  busboy.on('finish', () => {
    if (updatePostStatus.imageFound) {
      admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
          destination: `blogPostImages/${imageFileName}`,
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

          updatePost.imageURL = imageUrl;
          updatePostData(updatePost, req.params.postId, res);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: 'something went wrong ' });
        });
    } else {
      updatePostData(updatePost, req.params.postId, res);
    }
  });

  busboy.end(req.rawBody);
};

updatePostData = (updateData, postId, res) => {
  db.doc(`/blogPosts/${postId}`)
    .update(updateData)
    .then((doc) => {
      return res.json({
        message: `Blog post ${updateData.title} updated successfully `,
      });
    })
    .catch((err) => {
      return res.status(500).json({ error: 'blog post update failed ' });
      console.log(err);
    });
};

exports.likePost = (req, res) => {
  const trueOrFalseLike = req.params.trueOrFalse == 'true' ? true : false;

  const likeDocument = db
    .collection('likes')
    .where('userId', '==', req.user.uid)
    .where('postId', '==', req.params.postId)
    .limit(1);
  const postDocument = db.doc(`/blogPosts/${req.params.postId}`);
  let postData;
  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postId = doc.id;
        return likeDocument.get();
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection('likes')
          .add({
            postId: req.params.postId,
            userId: req.user.uid,
            like: trueOrFalseLike,
          })
          .then(() => {
            if (trueOrFalseLike) {
              postData.likes++;
              return postDocument.update({ likes: postData.likes });
            } else {
              postData.unlikes++;
              return postDocument.update({ unlikes: postData.unlikes });
            }
          })
          .then(() => {
            return res.json(postData);
          });
      } else {
        const likeDoc = db.doc(`/likes/${data.docs[0].id}`);

        if (data.docs[0].data().like) {
          if (trueOrFalseLike) {
            return likeDoc.delete().then(() => {
              postData.likes--;
              postDocument.update({ likes: postData.likes });
            });
          } else {
            return likeDoc.update({ like: trueOrFalseLike }).then(() => {
              postDocument.update({
                likes: postData.likes - 1,
                unlikes: postData.unlikes + 1,
              });
            });
          }
        } else {
          if (!trueOrFalseLike) {
            return likeDoc.delete().then(() => {
              postData.unlikes--;
              postDocument.update({ unlikes: postData.unlikes });
            });
          } else {
            return likeDoc.update({ like: trueOrFalseLike }).then(() => {
              postDocument.update({
                likes: postData.likes + 1,
                unlikes: postData.unlikes - 1,
              });
            });
          }
        }
      }
    })
    .then(() => {
      return res.json(postData);
    })
    .catch((err) => {
      return res.status(400).json({ error: err.code });
    });
};
