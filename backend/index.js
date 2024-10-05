var express = require("express");
var cors = require("cors");
var path = require('path');
var multer = require("multer");
var crypto = require('crypto');
var app = express();
var fs = require("fs");
const db = require("./connection.js"); // Make sure this line is present


const URL = "http://localhost";
const PORT = 3000;

var CryptoJS = require('crypto-js');

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
        const rows = await runQuery('SELECT * FROM user');
        res.send(rows);
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/viewall", async (req, res) => {
    try {
        const rows = await runQuery('SELECT * FROM recipe');
        res.send(rows);
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/get/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const rows = await runQuery('SELECT * FROM recipe WHERE _id = ?', [id]);
        const reviews = await runQuery('SELECT * FROM review WHERE recipe_id = ?', [id]);
        rows[0].reviews = reviews;
        res.send(rows[0]);
        console.log(rows[0]);
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/add", async (req, res) => {
    try {
        await runQuery('INSERT INTO user (username, email, place, age, password, admin) VALUES (?, ?, ?, ?, ?, ?)', 
        [req.body.username, req.body.email, req.body.place, req.body.age, req.body.password, false]);
        res.send({ message: "Data Added" });
    } catch (error) {
        console.log(error);
    }
});

app.get("/user/get/:email/:password", async (req, res) => {
    try {
        const email = req.params.email;
        const password = CryptoJS.SHA256(req.params.password).toString(CryptoJS.enc.Hex);
        const rows = await runQuery('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            res.send(rows[0]);
        } else {
            res.status(404).send({ message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/register/", async (req, res) => {
    try {
        const user = req.body;
        user.admin = false;
        user.password = CryptoJS.SHA256(user.password).toString(CryptoJS.enc.Hex);
        const existing_user = await runQuery('SELECT * FROM user WHERE email = ?', [user.email]);
        console.log(existing_user)
        if (existing_user.length === 0) {
            await runQuery('INSERT INTO user (username, email, place, age, password, admin) VALUES (?, ?, ?, ?, ?, ?)', 
            [user.username, user.email, user.place, user.age, user.password, user.admin]);
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
        const id = req.body._id;
        const user = req.body;
        const existing_user = await runQuery('SELECT * FROM user WHERE email = ?', [user.email]);
        if (existing_user.length === 0) {
            await runQuery('UPDATE user SET username = ?, place = ?, age = ? WHERE _id = ?', 
            [user.username, user.place, user.age, id]);
            res.send({ message: "Profile Updated" });
        } else if (existing_user[0]._id === user._id) {
            await runQuery('UPDATE user SET username = ?, email = ?, place = ?, age = ? WHERE _id = ?', 
            [user.username, user.email, user.place, user.age, id]);
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
        const id = req.body._id;
        const recipe = req.body;
        const db_recipe = await runQuery('SELECT * FROM recipe WHERE _id = ?', [id]);
        const recipeData = db_recipe[0];
        await runQuery('UPDATE recipe SET name = ?, ingredients = ?, instructions = ?, category = ? WHERE _id = ?', 
        [recipe.name, recipe.ingredients, recipe.instructions, recipe.category, id]);
        if (req.file) {
            const img_path = `images/recipes/${recipe._id}${path.extname(req.file.filename)}`;
            fs.unlink(recipeData.image, () => {});
            fs.rename(req.file.path, img_path, () => {});
            await runQuery('UPDATE recipe SET image = ? WHERE _id = ?', [img_path, id]);
        }
        res.send("Recipe Edited");
    } catch (error) {
        console.log(error);
    }
});

app.delete("/recipe/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const del = await runQuery('SELECT * FROM recipe WHERE _id = ?', [id]);
        if (del.length > 0) {
            fs.unlink(del[0].image, () => {});
            await runQuery('DELETE FROM recipe WHERE _id = ?', [id]);
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
        const recipe = req.body;
        recipe.reviews = JSON.stringify([]);
        recipe.rating = 0;
        recipe.featured = false;
        const result = await runQuery('INSERT INTO recipe (owner, ownername, name, ingredients, instructions, category, image, featured, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [recipe.owner, recipe.ownername, recipe.name, recipe.ingredients, recipe.instructions, recipe.category, "", recipe.featured, recipe.rating]);
        const img_path = `images/recipes/${result.insertId}${path.extname(req.file.filename)}`;
        fs.rename(req.file.path, img_path, () => {});
        await runQuery('UPDATE recipe SET image = ? WHERE _id = ?', [img_path, result.insertId]);
        res.send({ message: "Recipe Added" });
    } catch (error) {
        console.log(error);
    }
});

app.post("/recipe/addreview/:recipeId", async (req, res) => {
    try {
        const id = req.params.recipeId;
        const review = req.body;
        review.recipe_id=id
        const recipe = await runQuery('insert into review values (0,?,?,?,?,?)', [id,review.user_id,review.username,review.rating,review.comment]);
        // const reviews = JSON.parse(recipe[0].reviews);
        // reviews.unshift(review);
        // let total = 0;
        // for (let i = 0; i < reviews.length; i++) {
        //     total += reviews[i].rating;
        // }
        // const rating = total / reviews.length;
        // await runQuery('UPDATE recipe SET reviews = ?, rating = ? WHERE _id = ?', [JSON.stringify(reviews), rating, id]);
        res.send({ message: "Review Added" });
    } catch (error) {
        console.log(error);
    }
});

app.delete("/recipe/delreview/:recipeId/:userId", async (req, res) => {
    try {
        const recid = req.params.recipeId;
        const userid = req.params.userId;
        const recipe = await runQuery('SELECT * FROM recipe WHERE _id = ?', [recid]);
        const reviews = JSON.parse(recipe[0].reviews);
        const filteredReviews = reviews.filter(review => review.userId != userid);
        let total = 0;
        for (let i = 0; i < filteredReviews.length; i++) {
            total += filteredReviews[i].rating;
        }
        const rating = filteredReviews.length > 0 ? total / filteredReviews.length : 0;
        await runQuery('UPDATE recipe SET reviews = ?, rating = ? WHERE _id = ?', [JSON.stringify(filteredReviews), rating, recid]);
        res.send({ message: "Review Deleted" });
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/getreviews/:recipeId", async (req, res) => {
    try {
        const id = req.params.recipeId;
        const reviews = await runQuery('SELECT * FROM review WHERE recipe_id = ?', [id]);
        res.send((reviews));
    } catch (error) {
        console.log(error);
    }
});

app.get("/user/recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const rows = await runQuery('SELECT * FROM recipe WHERE owner = ?', [id]);
        res.send(rows);
    } catch (error) {
        console.log(error);
    }
});



// [ { _id: 1, recipe_id: 8 } ]


app.get("/recipe/featured", async (req, res) => {
    try {
        const featured = await runQuery('SELECT * FROM featured');
        const featured_recipes = [];
        for (let i = 0; i < featured.length; i++) {
            const recipe = await runQuery('SELECT * FROM recipe WHERE _id = ?', [featured[i].recipe_id]);
            featured_recipes.push(recipe[0])
        }
        res.send(featured_recipes);
        console.log(featured_recipes)
    } catch (error) {
        console.log(error);
    }
});

app.delete("/user/delete/", async (req, res) => {
    try {
        const id = req.body._id;
        await runQuery('DELETE FROM user WHERE _id = ?', [id]);
        res.send({ message: "User Deleted" });
    } catch (error) {
        console.log(error);
    }
});

app.use('/images/recipes', express.static(path.join(__dirname, 'images/recipes')));

app.listen(PORT, () => {
    console.log(`Server is running on ${URL}:${PORT}`);
});





