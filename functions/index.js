const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const express = require("express");
const cors = require("cors");

// Main App
const app = express();
app.use(cors({ origin: true }));

// DB reference
const db = admin.firestore();

// Routes
app.get('/categories', (req, res) => {
    (async () => {
        try {
            const categories = await db.collection("Categories").get()
            const response = categories.docs.map(doc => doc.data())
            return res.status(200).send({ status: "Success", data: response})
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: "Failed", msg: error })
        }
    })();
})

app.get('/words/:category', (req, res) => {
    (async () => {
        try {
            const allWords = await db.collection("Words").get()
            const response = allWords.docs
                .filter(doc => doc.data().Category === req.params.category)
                .map(doc => doc.data())
            return res.status(200).send({ status: "Success", msg: response})
        } catch (error) {
            console.log(error)
            return res.status(500).send({ status: "Failed", msg: error })
        }
    })();
})


// Export API to firebase cloud functions
exports.app = functions.https.onRequest(app);