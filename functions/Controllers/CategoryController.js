const admin = require("firebase-admin")
const {JsonResponse} = require("../Services/JsonResponseService");

module.exports.GetCategories = async (req, res) => {
    const db = admin.firestore()
    const categoriesCollection = await db.collection("Categories").get()
    const categories = categoriesCollection.docs.map(doc => doc.data().Category)

    const response = categories.length > 0
        ? JsonResponse(categories, true, 'Success', 200)
        : JsonResponse()

    return res.json(response)
}