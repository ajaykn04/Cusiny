var express = require("express");
var cors = require("cors");
var path = require('path');
var multer = require("multer");
var crypto = require('crypto')
var app = express();
var fs = require("fs");
const db = require("./connection.js"); // Ensure this connects to your MySQL database

const URL = "http://localhost";
const PORT = 3000;

var CryptoJS = require('crypto-js');
var recipeModel = require("./model/recipe"); // Update this to interact with MySQL
var userModel = require("./model/user"); // Update this to interact with MySQL
var secretKey = 'backend';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/recipes/');
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(8).toString('hex').slice(0, 8) + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

// Utility function to run MySQL queries
const runQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

app.get("/user/viewall", async (req, res) => {
    try {
        const users = await runQuery("SELECT * FROM users");
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/viewall", async (req, res) => {
    try {
        const recipes = await runQuery("SELECT * FROM recipes");
        res.send(recipes);
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/get/:id", async (req, res) => {
    try {
        const recipe = await runQuery("SELECT * FROM recipes WHERE id = ?", [req.params.id]);
        res.send(recipe[0]); // Sending the first result
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/add", async (req, res) => {
    try {
        await runQuery("INSERT INTO users SET ?", req.body);
        res.send({ message: "Data Added" });
    } catch (error) {
        console.log(error);
    }
});

app.post("/recipe/makefeatured/:id", async (req, res) => {
    try {
        await runQuery("UPDATE recipes SET featured = ? WHERE id = ?", [true, req.params.id]);
        res.send({ message: "Added Featured Recipe" });
    } catch (error) {
        console.log(error);
    }
});

app.get("/user/get/:email/:password", async (req, res) => {
    try {
        var email = req.params.email;
        var password = CryptoJS.SHA256(req.params.password).toString(CryptoJS.enc.Hex);
        const user = await runQuery("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
        if (user.length > 0) {
            res.send(user[0]); // Sending the first result
        } else {
            res.status(404).send({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/register/", async (req, res) => {
    try {
        var user = req.body;
        user.admin = false;
        user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
        const existing_user = await runQuery("SELECT * FROM users WHERE email = ?", [user.email]);
        if (existing_user.length === 0) {
            await runQuery("INSERT INTO users SET ?", user);
            res.send({ message: "Account Registered" });
        } else {
            res.status(409).send({ message: "Email Already Exists" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.put("/user/edit/", async (req, res) => {
    try {
        var user = req.body;
        const existing_user = await runQuery("SELECT * FROM users WHERE email = ?", [user.email]);
        if (existing_user.length === 0) {
            await runQuery("UPDATE users SET ? WHERE id = ?", [user, user._id]);
            res.send({ message: "Profile Updated" });
        } else if (existing_user[0].id == user._id) {
            await runQuery("UPDATE users SET ? WHERE id = ?", [user, user._id]);
            res.send({ message: "Profile Updated" });
        } else {
            res.status(409).send({ message: "Email Already Exists." });
        }
    } catch (error) {
        console.log(error);
    }
});

app.put("/recipe/edit/", upload.single('file'), async (req, res) => {
    try {
        var id = req.body._id;
        var recipe = req.body;
        const db_recipe = await runQuery("SELECT * FROM recipes WHERE id = ?", [id]);
        if (!req.file) {
            await runQuery("UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, category = ? WHERE id = ?", 
                           [recipe.name, recipe.ingredients, recipe.instructions, recipe.category, id]);
        } else {
            var img_path = `${req.file.destination}/${recipe._id}${path.extname(req.file.filename)}`;
            fs.unlink(db_recipe[0].image, () => {});
            fs.rename(req.file.path, img_path, () => {});
            recipe.image = `${img_path}`;
            await runQuery("UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, category = ?, image = ? WHERE id = ?", 
                           [recipe.name, recipe.ingredients, recipe.instructions, recipe.category, recipe.image, id]);
        }
        res.send("Recipe Edited");
    } catch (error) {
        console.log(error);
    }
});

app.delete("/user/delete/", async (req, res) => {
    try {
        const id = req.body._id;
        await db.beginTransaction();
        const userDeleteQuery = "DELETE FROM users WHERE id = ?";
        const [userResult] = await runQuery(userDeleteQuery, [id]);

        if (userResult.affectedRows > 0) {
            const recipeSelectQuery = "SELECT * FROM recipes WHERE owner = ?";
            const delrecipes = await runQuery(recipeSelectQuery, [id]);
            const recipeDeleteQuery = "DELETE FROM recipes WHERE owner = ?";
            await runQuery(recipeDeleteQuery, [id]);
            delrecipes.forEach((recipe) => {
                if (recipe.image) {
                    fs.unlink(recipe.image, (err) => {
                        if (err) {
                            console.error(`Failed to delete image: ${recipe.image}`, err);
                        }
                    });
                }
            });
            await db.commit();
            res.send({ message: "Account Deleted" });
        } else {
            await db.rollback();
            res.status(404).send({ message: "Failed To Delete Account" });
        }
    } catch (error) {
        await db.rollback();
        console.error("Error during account deletion:", error);
        res.status(500).send({ message: "Failed To Delete Account" });
    }
});

app.delete("/recipe/delete/:id", async (req, res) => {
    try {
        var id = req.params.id;
        const del = await runQuery("DELETE FROM recipes WHERE id = ?", [id]);
        if (del.affectedRows > 0) {
            fs.unlink(del.image, () => {});
            res.send({ message: "Recipe Deleted" });
        } else {
            res.status(404).send({ message: "Failed To Delete Recipe" });
        }
    } catch (error) {
        res.status(404).send({ message: "Failed To Delete Recipe" });
    }
});

app.post("/recipe/add/", upload.single('file'), async (req, res) => {
    try {
        var recipe = req.body;
        recipe.reviews = JSON.stringify([]); // Ensure reviews are stored as JSON
        recipe.rating = 0;
        recipe.featured = false;
        const result = await runQuery("INSERT INTO recipes SET ?", recipe);
        var img_path = `${req.file.destination}/${result.insertId}${path.extname(req.file.filename)}`;
        fs.rename(req.file.path, img_path, () => {});
        await runQuery("UPDATE recipes SET image = ? WHERE id = ?", [img_path, result.insertId]);
        res.send({ message: "Recipe Added" });
    } catch (error) {
        console.log(error);
    }
});

app.post("/recipe/addreview/:recipeId", async (req, res) => {
    try {
        var id = req.params.recipeId;
        var review = req.body;
        const recipe = await runQuery("SELECT * FROM recipes WHERE id = ?", [id]);
        let reviews = JSON.parse(recipe[0].reviews);
        reviews.unshift(review);
        let total = reviews.reduce((sum, r) => sum + r.rating, 0);
        await runQuery("UPDATE recipes SET reviews = ?, rating = ? WHERE id = ?", [JSON.stringify(reviews), total / reviews.length, id]);
        res.send({ message: "Review Added" });
    } catch (error) {
        console.log(error);
    }
});

app.delete("/recipe/delreview/:recipeId/:userId", async (req, res) => {
    try {
        var recid = req.params.recipeId;
        var userid = req.params.userId;
        const recipe = await runQuery("SELECT * FROM recipes WHERE id = ?", [recid]);
        let reviews = JSON.parse(recipe[0].reviews);
        reviews = reviews.filter(review => review.userId != userid);
        let total = reviews.reduce((sum, r) => sum + r.rating, 0);
        await runQuery("UPDATE recipes SET reviews = ?, rating = ? WHERE id = ?", [JSON.stringify(reviews), reviews.length > 0 ? total / reviews.length : 0, recid]);
        res.send({ message: "Review Deleted" });
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/getreviews/:recipeId", async (req, res) => {
    try {
        var id = req.params.recipeId;
        const recipe = await runQuery("SELECT reviews FROM recipes WHERE id = ?", [id]);
        res.send(JSON.parse(recipe[0].reviews));
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${URL}:${PORT}`);
});
