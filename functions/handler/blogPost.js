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
          .collection('blogPost')
          .add(newPost)
          .then((doc) => {
            res.json({ message: `Blog post ${doc.id} created successfully ` });
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
  db.collection('blogPost')
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
        });
      });
      return res.json(blogPosts);
    })
    .catch((err) => console.error(err));
};

exports.getAuthUserBlogPost = (req, res) => {
  let blogPost = {};
  db.doc(`/blogPost/${req.params.postId}`)
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

  const newPost = {
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (filename.trim() != '') {
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
      })
      .then(() => {
        return db
          .collection('blogPost')
          .add(newPost)
          .then((doc) => {
            res.json({ message: `Blog post ${doc.id} updated successfully ` });
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
