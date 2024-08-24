var express = require("express");
var cors = require("cors");
var path = require("path");
var multer = require("multer");
var crypto = require("crypto");
var fs = require("fs");
var app = express();
var CryptoJS = require("crypto-js");
var recipeModel = require("./model/recipe");
var userModel = require("./model/user");
require("./connection.js");

var secretKey = "backend";

app.use(
  cors({
    origin: ["https://cusiny.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/recipes/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomBytes(8).toString("hex").slice(0, 8) +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.use(express.json());

app.get("/user/viewall", async (req, res) => {
  try {
    var data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/recipe/viewall", async (req, res) => {
  try {
    var data = await recipeModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/recipe/get/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var data = await recipeModel.findOne({ _id: id });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/user/add", async (req, res) => {
  try {
    await userModel(req.body).save();
    res.send({ message: "Data Added" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/recipe/makefeatured/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var recipe = await recipeModel.findById(id);
    recipe.featured = true;
    recipe.save();

    res.send({ message: "Added Featured Recipe" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user/get/:email/:password", async (req, res) => {
  try {
    var email = req.params.email;
    var password = CryptoJS.SHA256(req.params.password).toString(
      CryptoJS.enc.Hex
    );
    var user = await userModel.findOne({ email: email, password: password });
    if (user) {
      res.send(user);
    } else {
      res.status(404);
      res.send({ message: "Invalid Email or Password" });
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
    var existing_user = await userModel.findOne({ email: user.email });
    if (!existing_user) {
      await userModel(user).save();
      res.send({ message: "Account Registered" });
    } else {
      res.status(409);
      res.send({ message: "Email Already Exists" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/user/edit/", async (req, res) => {
  try {
    var id = req.body._id;
    var user = req.body;
    var existing_user = await userModel.findOne({ email: user.email });
    if (!existing_user) {
      await userModel.findByIdAndUpdate(id, user);
      res.send({ message: "Profile Updated" });
    } else if (existing_user._id == user._id) {
      await userModel.findByIdAndUpdate(id, user);
      res.send({ message: "Profile Updated" });
    } else {
      res.status(409);
      res.send({ message: "Email Already Exists." });
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/recipe/edit/", upload.single("file"), async (req, res) => {
  try {
    var id = req.body._id;
    var recipe = req.body;

    var db_recipe = await recipeModel.findById(id);
    if (!db_recipe) {
      return res.status(404).send({ message: "Recipe not found" });
    }

    // Update recipe fields
    db_recipe.name = recipe.name;
    db_recipe.ingredients = recipe.ingredients;
    db_recipe.instructions = recipe.instructions;
    db_recipe.category = recipe.category;

    if (req.file) {
      // Handle image update
      var img_path = `${req.file.destination}/${recipe._id}${path.extname(
        req.file.filename
      )}`;

      // Unlink old image if it exists
      if (db_recipe.image) {
        fs.unlink(db_recipe.image, (err) => {
          if (err) console.log(err);
        });
      }

      // Rename new file
      fs.rename(req.file.path, img_path, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Failed to upload image" });
        }
      });

      db_recipe.image = `${img_path}`;
    }

    await db_recipe.save();
    res.send({ message: "Recipe Edited" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to edit recipe" });
  }
});

app.delete("/recipe/delete/:id", async (req, res) => {
  try {
    var id = req.params.id;
    var del = await recipeModel.findByIdAndDelete(id);
    if (del != null) {
      fs.unlink(del.image, () => {});
      res.send({ message: "Recipe Deleted" });
    } else {
      res.status(404);
      res.send({ message: "Failed To Delete Recipe" });
    }
  } catch (error) {
    res.status(404);
    res.send({ message: "Failed To Delete Recipe" });
  }
});

app.post("/recipe/add/", upload.single("file"), async (req, res) => {
  try {
    var recipe = req.body;
    recipe.reviews = [];
    recipe.rating = 0;
    recipe.featured = false;
    recipe.image = ""; // Initialize the image field

    recipe = await recipeModel(recipe).save(); // Save the recipe first

    if (req.file) {
      var img_path = `${req.file.destination}/${recipe._id}${path.extname(
        req.file.filename
      )}`;

      // Rename the uploaded file to match the recipe ID
      fs.rename(req.file.path, img_path, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: "Failed to upload image" });
        }
      });

      recipe.image = `${img_path}`;
      await recipe.save();
    }

    res.send({ message: "Recipe Added" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to add recipe" });
  }
});

app.post("/recipe/addreview/:recipeId", async (req, res) => {
  try {
    var id = req.params.recipeId;
    var review = req.body;
    var recipe = await recipeModel.findById(id);
    recipe.reviews.unshift(review);
    let total = 0;
    for (let i = 0; i < recipe.reviews.length; i++) {
      total += recipe.reviews[i].rating;
    }
    recipe.rating = total / recipe.reviews.length;
    await recipe.save();
    res.send({ message: "Review Added" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/recipe/delreview/:recipeId/:userId", async (req, res) => {
  try {
    var recid = req.params.recipeId;
    var userid = req.params.userId;
    var recipe = await recipeModel.findById(recid);
    recipe.reviews = recipe.reviews.filter((review) => review.userId != userid);
    let total = 0;
    for (let i = 0; i < recipe.reviews.length; i++) {
      total += recipe.reviews[i].rating;
    }
    recipe.rating = total / recipe.reviews.length;
    await recipe.save();
    res.send({ message: "Review Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/recipe/getreviews/:recipeId", async (req, res) => {
  try {
    var id = req.params.recipeId;
    var recipe = await recipeModel.findById(id);
    res.send(recipe.reviews);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/delete/", async (req, res) => {
  try {
    var id = req.body._id;
    var del = await userModel.findByIdAndDelete(id);
    if (del != null) {
      var delrecipes = await recipeModel.find({ owner: id });
      await recipeModel.deleteMany({ owner: id });
      for (let i = 0; i < delrecipes.length; i++) {
        fs.unlink(delrecipes[i].image, () => {});
      }
      res.send({ message: "User Deleted" });
    } else {
      res.status(404);
      res.send({ message: "Failed To Delete User" });
    }
  } catch (error) {
    res.status(404);
    res.send({ message: "Failed To Delete User" });
  }
});

app.listen(3000, () => {
  console.log("App is Running on Port 3000");
});
