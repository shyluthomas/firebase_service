/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");


// const functions = require("firebase-functions");
var admin = require("firebase-admin");

var serviceAccount = require("./cloud-project-ee317-firebase-adminsdk-o9bbv-655ceb2f24.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin: true}));
const db = admin.firestore();

app.get('/', (req,res) => {
return res.status(200).send('server running');
})

// Post
app.post("/api/create", (req, res) => {
    (async () => {
      try {
        await db.collection("userdetails").doc(`/${Date.now()}/`).create({
          id: Date.now(),
          name: req.body.name,
          mobile: req.body.mobile,
          address: req.body.address,
        });
  
        return res.status(200).send({ status: "Success", msg: "Data Saved" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed", msg: error });
      }
    })();
  });
  
  // read specific user detail
  // get
  app.get("/api/userDetail/:id", (req, res) => {
    (async () => {
      try {
        const reqDoc = db.collection("userdetails").doc(req.params.id);
        let userDetail = await reqDoc.get();
        let response = userDetail.data();
  
        return res.status(200).send({ status: "Success", data: response });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed", msg: error });
      }
    })();
  });
  
  // read all user details
  // get
  app.get("/api/userDetails", (req, res) => {
    (async () => {
      try {
        let query = db.collection("userdetails");
        let response = [];
  
        await query.get().then((data) => {
          let docs = data.docs; // query results
  
          docs.map((doc) => {
            const selectedData = {
              name: doc.data().name,
              mobile: doc.data().mobile,
              address: doc.data().address,
            };
  
            response.push(selectedData);
          });
          return response;
        });
  
        return res.status(200).send({ status: "Success", data: response });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed", msg: error });
      }
    })();
  });
  
  // update
  // put
  app.put("/api/update/:id", (req, res) => {
    (async () => {
      try {
        const reqDoc = db.collection("userdetails").doc(req.params.id);
        await reqDoc.update({
          name: req.body.name,
          mobile: req.body.mobile,
          address: req.body.address,
        });
        return res.status(200).send({ status: "Success", msg: "Data Updated" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed", msg: error });
      }
    })();
  });
  
  // delete
  // delete
  app.delete("/api/delete/:id", (req, res) => {
    (async () => {
      try {
        const reqDoc = db.collection("userdetails").doc(req.params.id);
        await reqDoc.delete();
        return res.status(200).send({ status: "Success", msg: "Data Removed" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Failed", msg: error });
      }
    })();
  });

exports.app = onRequest(app);