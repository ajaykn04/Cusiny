const db = require('../connection');

// Add a new recipe
const addRecipe = (recipe, callback) => {
    const sql = 'INSERT INTO recipes (owner_id, ownername, name, ingredients, instructions, category, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [recipe.owner_id, recipe.ownername, recipe.name, recipe.ingredients, recipe.instructions, recipe.category, recipe.image, recipe.featured];
    db.query(sql, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Get all recipes
const getAllRecipes = (callback) => {
    db.query('SELECT * FROM recipes', (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Get a recipe by ID
const getRecipeById = (id, callback) => {
    const sql = 'SELECT * FROM recipes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

module.exports = {
    addRecipe,
    getAllRecipes,
    getRecipeById
};
