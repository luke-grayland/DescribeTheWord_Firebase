const {GetCategories} = require("../Controllers/CategoryController")
const {GetWordsByCategory} = require("../Controllers/WordsController");

const Routes = (app) => {
    app.get('/categories', GetCategories)
    app.get('/words/:category', GetWordsByCategory)
}

module.exports = Routes