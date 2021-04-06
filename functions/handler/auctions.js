const { doc } = require('prettier');
const { db, admin } = require('../util/admin');
const { validateAddAuction } = require('../util/validators');

exports.getAllAuctions = (req, res) => {
  db.collection('auctions')
    .orderBy('createdAt', 'desc')
    .limit(Number(req.params.limitAuctions))
    .where('approval', '==', 1)
    .where('sold', '==', 0)
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

exports.userAuctionsSell = (req, res) => {
  db.collection('auctions')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', req.user.uid)
    .where('sold', '==', 2)
    .get()
    .then((data) => {
      let auctions = auctionFetch(data);
      return res.json(auctions);
    })
    .catch((err) => console.error(err));
};
exports.userAuctionsBuy = (req, res) => {
  db.collection('auctions')
    .orderBy('createdAt', 'desc')
    .where('maxBidUserId', '==', req.user.uid)
    .where('sold', '==', 2)
    .get()
    .then((data) => {
      let auctions = auctionFetch(data);
      return res.json(auctions);
    })
    .catch((err) => console.error(err));
};

exports.getAuthUserAllAuctions = (req, res) => {
  db.collection('auctions')
    .where('userId', '==', req.user.uid)
    .where('sold', '!=', 2)
    .get()
    .then((data) => {
      let auctions = auctionFetch(data);
      return res.json(auctions);
    })
    .catch((err) => console.error(err));
};
exports.bidAuctions = (req, res) => {
  db.collection('auctions')
    .where('sold', '!=', 2)
    .where('participents', 'array-contains', req.user.uid)
    .get()
    .then((data) => {
      let auctions = auctionFetch(data);
      return res.json(auctions);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
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
    approval: 0,
    payment: 0,

    delivery: 0,
    orderConfirmation: 0,
    sold: 0,
    maxBid: '0',
    maxBidUserId: '',
    maxBidId: '',
    participents: [],
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
    if (doc.data().approval != 0) {
      return res
        .status(400)
        .json({ error: 'Can not edit Auction, available for public!' });
    }
    const { valid, errors } = validateAddAuction(auctionDetails);
    if (!valid) return res.status(400).json(errors);
    auction
      .update(auctionDetails)
      .then(() => {
        auctionDetails.auctionId = req.body.auctionId;
        auctionDetails.createdAt = beforeSnap.createdAt;
        auctionDetails.maxBid = beforeSnap.maxBid;
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
exports.endAuction = (req, res) => {
  let status;

  db.doc(`/auctions/${req.params.auctionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Auction not found!' });
      }
      if (doc.data().sold === 1) {
        return res.status(400).json({
          error: 'Auction has been ended!',
        });
      }
      if (doc.data().bids === 0) {
        return res.status(400).json({
          error:
            'can not end auction since bids not available. if you want to remove the auction from the list, please detele.',
        });
      }

      if (doc.data().userId !== req.user.uid) {
        return res.status(400).json({
          error: `Not allowed to change ${
            doc.data().auctionName
          } auction status`,
        });
      } else {
        return doc.ref.update({ sold: 1, payment: 1 }).then(() => {
          return res.json({
            message: 'Auction ended!, Current Max bid won the auction!',
          });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.makePayment = (req, res) => {
  let status;

  db.doc(`/auctions/${req.params.auctionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Auction not found!' });
      }

      if (doc.data().maxBidUserId !== req.user.uid) {
        return res.status(400).json({
          error: `Auction has been reseved for someone else`,
        });
      }
      if (doc.data().maxBidUserId == req.user.uid && doc.data().sold !== 1) {
        return res.status(400).json({
          error: `Can not make payment since auction is not recerved to you!`,
        });
      }
      if (doc.data().payment == 2) {
        return res
          .status(400)
          .json({ error: 'Payment has been done already!' });
      }
      return doc.ref.update({ payment: 2 }).then(() => {
        return res.json({
          message: 'Payment has been succesful!',
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
exports.getAuction = (req, res) => {
  let auctionData = {};
  let auctionDoc = db.doc(`/auctions/${req.params.auctionId}`);

  auctionDoc
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Auction not found!' });
      }
      auctionData = doc.data();
      auctionData.auctionId = doc.id;
      auctionDoc
        .collection('bids')
        .get()
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
        });
    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};

exports.bidOnAuction = (req, res) => {
  const newBid = {
    createdAt: new Date(),
    bidAmount: req.body.bidAmount,
    userId: req.user.uid,
    userName: req.user.email,
    imageUrl: req.user.imageUrl,
  };

  const auctionDocument = db.doc(`/auctions/${req.params.auctionId}`);
  let auctionData;
  auctionDocument
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Auction not found!' });
      } else {
        auctionData = doc.data();
      }
      if (doc.data().userId === req.user.uid) {
        return res
          .status(404)
          .json({ error: 'You are not allowed to bid on your auction!' });
      }
      if (!doc.data().approval) {
        return res
          .status(404)
          .json({ error: 'Not allowed to bid, Auction not approve!' });
      }

      if (
        parseFloat(doc.data().maxBid) >= parseFloat(req.body.bidAmount) ||
        parseFloat(doc.data().initAmount) >= parseFloat(req.body.bidAmount)
      ) {
        return res
          .status(404)
          .json({ error: 'Bid amount is low, increase bid amount!' });
      }
      return auctionDocument
        .collection('bids')
        .add(newBid)
        .then((data) => {
          //auctionData.bids++;
          let participentArr = doc.data().participents;

          // console.log(doc.data().participents.arrayUnion(req.user.uid));
          participentArr.includes(req.user.uid)
            ? participentArr
            : participentArr.push(req.user.uid);

          doc.ref.update({
            bids: doc.data().bids + 1,
            maxBidId: data.id,
            maxBid: req.body.bidAmount,
            maxBidUserId: req.user.uid,
            participents: participentArr,
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
      if (doc.data().sold != 0) {
        return res
          .status(404)
          .json({ error: 'Auction has reserved or end, can not delete!' });
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

const auctionFetch = (data) => {
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
      sold: doc.data().sold,
      buyNowAmount: doc.data().buyNowAmount,
      payment: doc.data().payment,

      delivery: doc.data().delivery,

      maxBidUserId: doc.data().maxBidUserId,
    });
  });
  return auctions;
};
