const functions = require("firebase-functions")
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")
const express = require("express")
const cors = require("cors")
const Routes = require("./Routes/Routes")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
app.use(cors({ origin: true }))

Routes(app)
exports.app = functions.https.onRequest(app)