var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
    name: String,
    items: Number
})

var recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;
