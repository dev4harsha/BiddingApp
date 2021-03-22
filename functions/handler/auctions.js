const { doc } = require('prettier');
const { db, admin } = require('../util/admin');

exports.getAllAuctions = (req, res) => {
  db.collection('auctions')
    .orderBy('createdAt', 'desc')
    .limit(Number(req.params.limitAuctions))
    .where('active', '==', true)
    .where('approval', '==', true)
    .get()
    .then((data) => {
      let auctions = [];
      data.forEach((doc) => {
        auctions.push({
          auctionId: doc.id,
          auctionName: doc.data().auctionName,
          initAmount: doc.data().initAmount,
          endDateTime: doc.data().endDateTime,
          auctionType: doc.data().auctionType,
          bids: doc.data().bids,
        });
      });
      return res.json(auctions);
    })
    .catch((err) => console.error(err));
};

exports.getAuthUserAllAuctions = (req, res) => {
  db.collection('auctions')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', req.user.uid)
    .get()
    .then((data) => {
      let auctions = [];
      data.forEach((doc) => {
        auctions.push({
          domainId: doc.id,
          auctionName: doc.data().auctionName,
          initAmount: doc.data().initAmount,
          endDateTime: doc.data().endDateTime,
          auctionType: doc.data().auctionType,
          active: doc.data().active,
          approval: doc.data().approval,
          bids: doc.data().bids,
        });
      });
      return res.json(auctions);
    })
    .catch((err) => console.error(err));
};
exports.postOneAuction = (req, res) => {
  const newAuction = {
    auctionName: req.body.auctionName,
    auctionType: req.body.auctionType,
    itemDescription: req.body.itemDescription,
    initAmount: req.body.initAmount,
    createdAt: new Date(),
    endDateTime: admin.firestore.Timestamp.fromDate(new Date()), //req.body.endDateTime, //admin.firestore.Timestamp.fromDate(new Date()),
    userId: req.user.uid,
    approval: false,
    active: false,
    maxBid: 0,
    bids: 0,
  };
  db.collection('auctions')
    .add(newAuction)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} created successfully ` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'somthing went wrong' });
      console.log(err);
    });
};
exports.activeDeactiveAuction = (req, res) => {
  let status;

  db.doc(`/auctions/${req.params.auctionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Auction not found!' });
      }

      if (doc.data().userId !== req.user.uid) {
        return res.status(400).json({
          error: `Not allowed to change ${
            doc.data().auctionName
          } auction status`,
        });
      } else {
        status = !doc.data().active;
        return doc.ref.update({ active: status }).then(() => {
          return res.json({
            message: `Auction ${status ? 'Ativated' : 'Deactivated'}`,
          });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.getAuction = (req, res) => {
  let auctionData = {};
  db.doc(`/auctions/${req.params.auctionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Auction not found!' });
      }
      auctionData = doc.data();
      auctionData.auctionId = doc.id;
      return db
        .collection('bids')
        .orderBy('createdAt', 'desc')
        .where('auctionId', '==', req.params.auctionId)
        .get();
    })
    .then((data) => {
      auctionData.bidsData = [];
      data.forEach((doc) => {
        auctionData.bidsData.push(doc.data());
      });
      return res.json(auctionData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.bidOnAuction = (req, res) => {
  const newBid = {
    createdAt: new Date(),
    bidAmount: req.body.bidAmount,
    auctionId: req.params.auctionId,
    userId: req.user.uid,
    userName: req.user.email,
    imageUrl: req.user.imageUrl,
  };

  const domainDocument = db.doc(`/auctions/${req.params.auctionId}`);
  let auctionData;
  domainDocument
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Auction not found!' });
      } else {
        auctionData = doc.data();
      }
      if (!doc.data().active) {
        return res
          .status(404)
          .json({ error: 'Not allowed to bid, Auction not active!' });
      }
      if (!doc.data().approval) {
        return res
          .status(404)
          .json({ error: 'Not allowed to bid, Auction not approve!' });
      }
      if (
        doc.data().maxBid >= req.body.bidAmount ||
        doc.data().initAmount >= req.body.bidAmount
      ) {
        return res
          .status(404)
          .json({ error: 'Bid amount is low, increase bid amount!' });
      }

      return db
        .collection('bids')
        .where('auctionId', '==', req.params.auctionId)
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
        .then((data) => {
          // return res.json(data.docs[0].id);
          //console.log(data.docs[0].id);
          if (data.empty) {
            return db
              .collection('bids')
              .add(newBid)
              .then((data) => {
                //auctionData.bids++;
                doc.ref.update({
                  bids: doc.data().bids + 1,
                  maxBidId: data.id,
                  maxBid: req.body.bidAmount,
                });
              });
          }

          return db
            .doc(`/bids/${data.docs[0].id}`)
            .update({ bidAmount: req.body.bidAmount })
            .then(() => {
              //return db.doc(`/domains/${req.params.domainId}`)
              //console.log(data.id);
              doc.ref.update({
                maxBid: req.body.bidAmount,
                maxBidId: data.docs[0].id,
              });
            });
        })

        .then(() => {
          return res.json(newBid);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: 'Somthing went wrong' });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Somthing went wrong' });
    });
};
exports.deleteAuction = (req, res) => {
  const documnet = db.doc(`/auctions/${req.params.auctionId}`);
  documnet
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Auction not found' });
      }
      if (doc.data().userId !== req.user.uid) {
        return res.status(404).json({ error: 'Unauthorized' });
      }
      if (doc.data().bids > 0) {
        return res.status(404).json({
          error: `Can not delete, ${doc.data().bids} bids are available`,
        });
      }
      return documnet.delete();
    })
    .then(() => {
      return res.json({ message: 'Auction deleted successfully' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
