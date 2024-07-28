var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
    owner: String,
    name: String,
    ingredients: String,
    instructions: String,
    category: String,
    image: String,
});

var recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;