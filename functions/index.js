const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const app = express();

app.get("/domains", (req, res) => {
  admin
    .firestore()
    .collection("domains")
    .get()
    .then((data) => {
      let domains = [];
      data.forEach((doc) => {
        domains.push(doc.data());
      });
      return res.json(domains);
    })
    .catch((err) => console.error(err));
});

exports.api = functions.https.onRequest(app);
