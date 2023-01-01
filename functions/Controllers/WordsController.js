const admin = require("firebase-admin");
const {JsonResponse} = require("../Services/JsonResponseService");

module.exports.GetWordsByCategory = async (req, res) => {
    const db = admin.firestore()
    const allWords = await db.collection("Words").get()
    const words = allWords.docs
        .filter(doc => doc.data().Category.toLowerCase() === req.params.category.toString())
        .map(doc => doc.data().Word)

    const response = words.length > 0
        ? JsonResponse(words, true, 'Success', 200)
        : JsonResponse()

    return res.json(response)
}