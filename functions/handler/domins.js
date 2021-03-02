const { db, admin } = require('../util/admin');

exports.getAllDomains = (req, res) => {
  db.collection('domains')
    .orderBy('createdAt', 'desc')
    .where('active', '==', true)
    .get()
    .then((data) => {
      let domains = [];
      data.forEach((doc) => {
        domains.push({
          domainId: doc.id,
          domainname: doc.data().domainname,
          registrar: doc.data().registrar,
          bidamount: doc.data().bidamount,
          expires: doc.data().expires,
          endDateTime: doc.data().endDateTime,
          domaintype: doc.data().domaintype,
          bids: doc.data().bids,
          age: doc.data().age,
        });
      });
      return res.json(domains);
    })
    .catch((err) => console.error(err));
};

exports.getAuthUserAllDomains = (req, res) => {
  db.collection('domains')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', req.user.uid)
    .get()
    .then((data) => {
      let domains = [];
      data.forEach((doc) => {
        domains.push({
          domainId: doc.id,
          domainname: doc.data().domainname,
          registrar: doc.data().registrar,
          bidamount: doc.data().bidamount,
          expires: doc.data().expires,
          endDateTime: doc.data().endDateTime,
          domaintype: doc.data().domaintype,
          age: doc.data().age,
          active: doc.data().active,
          bids: doc.data().bids,
        });
      });
      return res.json(domains);
    })
    .catch((err) => console.error(err));
};
exports.postOneDomain = (req, res) => {
  const newDomain = {
    domainname: req.body.domainname,
    registrar: req.body.registrar,
    domaintype: req.body.domaintype,
    age: req.body.age,
    bidamount: req.body.bidamount,
    createdAt: new Date().toISOString(),
    endDateTime: admin.firestore.Timestamp.fromDate(new Date()), //req.body.endDateTime, //admin.firestore.Timestamp.fromDate(new Date()),
    expires: admin.firestore.Timestamp.fromDate(new Date()), //req.body.expires, //admin.firestore.Timestamp.fromDate(new Date()),
    userId: req.user.uid,
    active: true,
    maxBid: 0,
    bids: 0,
  };
  db.collection('domains')
    .add(newDomain)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} created successfully ` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'somthing went wrong' });
      console.log(err);
    });
};
exports.getDomain = (req, res) => {
  let domainData = {};
  db.doc(`/domains/${req.params.domainId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(400).json({ error: 'Domain not found!' });
      }
      domainData = doc.data();
      domainData.domainId = doc.id;
      return db
        .collection('bids')
        .orderBy('createdAt', 'desc')
        .where('domainId', '==', req.params.domainId)
        .get();
    })
    .then((data) => {
      domainData.bidsData = [];
      data.forEach((doc) => {
        domainData.bids.push(doc.data());
      });
      return res.json(domainData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.bidOnDomain = (req, res) => {
  const newBid = {
    createdAt: new Date().toISOString(),
    bidAmount: req.body.bidAmount,
    domainId: req.params.domainId,
    userId: req.user.uid,
    userName: req.user.email,
    userImage: req.user.imageUrl,
  };

  const domainDocument = db.doc(`/domains/${req.params.domainId}`);
  let domainData;
  domainDocument
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Domain not found!' });
      } else {
        domainData = doc.data();
      }
      if (!doc.data().active) {
        return res
          .status(404)
          .json({ error: 'Not allowed to bid, Domain not active!' });
      }
      if (
        doc.data().maxBid >= req.body.bidAmount ||
        doc.data().bidamount >= req.body.bidAmount
      ) {
        return res
          .status(404)
          .json({ error: 'Bid amount is low, increase bid amount!' });
      }

      return db
        .collection('bids')
        .where('domainId', '==', req.params.domainId)
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get()
        .then((data) => {
          //return res.json(data.docs[0].id);
          //console.log(data.docs[0].id);
          if (data.empty) {
            let bidId = data.docs[0].id;
            return db
              .collection('bids')
              .add(newBid)
              .then(() => {
                //domainData.bids++;
                doc.ref.update({
                  bids: doc.data().bids + 1,
                  bidId: bidId,
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
                bidId: data.docs[0].id,
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
