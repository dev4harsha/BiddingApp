const { doc } = require('prettier');
const { db, admin } = require('../util/admin');
const { validateAddAuction } = require('../util/validators');

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
          auctionId: doc.id,
          auctionName: doc.data().auctionName,
          initAmount: doc.data().initAmount,
          endDateTime: doc.data().endDateTime,
          auctionType: doc.data().auctionType,
          createdAt: doc.data().createdAt,
          itemDescription: doc.data().itemDescription,
          maxBid: doc.data().maxBid,
          active: doc.data().active,
          approval: doc.data().approval,
          bids: doc.data().bids,
          buyNowAmount: doc.data().buyNowAmount,
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
    buyNowAmount: req.body.buyNowAmount,
    createdAt: new Date(),
    endDateTime: new Date(req.body.endDateTime), //admin.firestore.Timestamp.fromDate(new Date()),
    userId: req.user.uid,
    approval: false,
    active: false,
    maxBid: 0,
    bids: 0,
  };
  const { valid, errors } = validateAddAuction(newAuction);
  if (!valid) return res.status(400).json(errors);

  db.collection('auctions')
    .add(newAuction)
    .then((doc) => {
      res.json({
        message: `Auction added successfully `,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'somthing went wrong' });
      console.log(err);
    });
};
exports.updateAuction = (req, res) => {
  let auctionDetails = {
    auctionName: req.body.auctionName,
    auctionType: req.body.auctionType,
    itemDescription: req.body.itemDescription,
    initAmount: req.body.initAmount,
    buyNowAmount: req.body.buyNowAmount,
    endDateTime: admin.firestore.Timestamp.fromDate(
      new Date(req.body.endDateTime)
    ),
  };

  const auction = db.collection('auctions').doc(req.body.auctionId);
  auction.get().then((doc) => {
    const beforeSnap = doc.data();
    if (!doc.exists) {
      return res.status(400).json({ error: 'Auction not found!' });
    }
    const { valid, errors } = validateAddAuction(auctionDetails);
    if (!valid) return res.status(400).json(errors);
    auction
      .update(auctionDetails)
      .then(() => {
        auctionDetails.auctionId = req.body.auctionId;
        auctionDetails.createdAt = beforeSnap.createdAt;
        auctionDetails.maxBid = beforeSnap.maxBid;
        auctionDetails.active = beforeSnap.active;
        auctionDetails.approval = beforeSnap.approval;
        auctionDetails.bids = beforeSnap.bids;
        return res.json({
          message: {
            message: `Auction ${req.body.auctionName} updated successfully `,
          },
          data: auctionDetails,
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .json({ error: `${doc.data().auctionName} Update failed` });
      });
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
        .limit(5)
        .get();
    })
    .then((data) => {
      auctionData.bidsData = [];
      data.forEach((doc) => {
        auctionData.bidsData.push({
          imageUrl: doc.data().imageUrl,
          bidAmount: doc.data().bidAmount,
          createdAt: doc.data().createdAt,
          auctionId: doc.data().auctionId,
          userName: doc.data().userName,
          userId: doc.data().userId,
          buyNowAmount: doc.data().buyNowAmount,
          bidId: doc.id,
        });
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
        .add(newBid)
        .then((data) => {
          //auctionData.bids++;
          doc.ref.update({
            bids: doc.data().bids + 1,
            maxBidId: data.id,
            maxBid: req.body.bidAmount,
          });
          newBid.bidId = data.id;
        })
        .then(() => {
          // return res.json(newBid);
          res.status(200).json({ message: 'Bid Placed successfully' });
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
      return documnet.delete().then(() => {
        return res.json({ message: 'Auction deleted successfully' });
      });
    })

    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
