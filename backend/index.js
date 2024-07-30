var express = require("express");
var cors = require("cors");
var path = require('path');
var multer = require("multer");
var crypto = require('crypto')
var app = express();
var fs = require("fs");
require("./connection.js");

const URL = "http://localhost";
const PORT = 3000;


var recipeModel = require("./model/recipe");
var userModel = require("./model/user");


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



app.get("/user/viewall", async(req, res)=>{
    try {
        var data = await userModel.find();
        res.send(data)
        
    } catch (error) {
        console.log(error);
    }
});

app.get("/recipe/viewall", async(req, res)=>{
    try {
        var data = await recipeModel.find();
        res.send(data)
        
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/add", async(req, res)=>{
    try {
        await userModel(req.body).save();
        res.send({message: "Data Added"});
    } catch (error) {
        console.log(error);
    }
});

app.get("/user/get/:email/:password", async(req, res)=>{
    try {
        var email = req.params.email;
        var password = req.params.password;
        var user = await userModel.findOne({email: email, password: password});
        if (user){
            res.send(user);
        }
        else {
            res.status(404);
            res.send({ message: "Invalid Email or Password" });
        }
        
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/register/", async(req, res)=>{
    try {
        var user = req.body;
        user.admin = false;
        var existing_user = await userModel.findOne({email: user.email});
        if (!existing_user){
            
            await userModel(user).save();
            res.send({message: "Account Registered"});

        }
        else {
            res.status(409);
            res.send({ message: "Email Already Exists" });
        }
        
    } catch (error) {
        console.log(error);
    }
});

app.put("/user/edit/", async(req, res)=>{
    try {
        var id = req.body._id;
        var user = req.body;
        var existing_user = await userModel.findOne({email: user.email});
        if (!existing_user) {
            await userModel.findByIdAndUpdate(id, user);
            res.send({message: "Profile Updated"})
        }
        else if (existing_user._id == user._id){
            await userModel.findByIdAndUpdate(id, user);
            res.send({message: "Profile Updated"})
        }
        else {
            res.status(409);
            res.send({message: "Email Already Exists."})
        }
        
    } catch (error) {
        console.log(error);
    }
})

app.delete("/user/delete/", async(req, res)=>{
    try {
        var id = req.body._id;
        var del = await userModel.findByIdAndDelete(id);
        if (del != null){
            res.send({message: "Account Deleted"});
        }
        else {
            res.status(404);
            res.send({message: "Failed To Delete Account"});
        }
        
    } catch (error) {
        res.status(404);
        res.send({message: "Failed To Delete Account"});
    }
})


app.post("/recipe/add/", upload.single('file'), async(req, res)=>{
    try {
        var recipe = req.body;
        req.body.image = ""
        recipe = await recipeModel(recipe).save();
        var img_path = `${req.file.destination}/${recipe._id}${path.extname(req.file.filename)}`;
        fs.rename(req.file.path, img_path, ()=>{})
        recipe.image = `${img_path}`;
        recipe.save();
        
        res.send({message: "Recipe Added"})

    } catch (error) {
        console.log(error);
    }
});

app.use('/images/recipes', express.static(path.join(__dirname, 'images/recipes')));


app.listen(PORT, ()=>{
    console.log("Port is Up");
});