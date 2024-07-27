var express = require("express");
var cors = require("cors");

var app = express();

require("./connection.js");

var recipeModel = require("./model/recipe");
var userModel = require("./model/user");

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
            
            await userModel(user).save(user);
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

app.listen(3000, ()=>{
    console.log("Port is Up");
})