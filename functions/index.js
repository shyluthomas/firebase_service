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

app.get('/', (req,res) => {
return res.status(200).send('server running');
})

exports.app = onRequest(app);