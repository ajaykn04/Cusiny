var mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    userId: String,
    username: String,
    rating: Number,
    comment: String
});

var recipeSchema = mongoose.Schema({
    owner: String,
    ownername: String,
    name: String,
    ingredients: String,
    instructions: String,
    category: String,
    image: String,
    featured: Boolean,
    rating: Number,
    reviews: [reviewSchema]
});

var recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;
