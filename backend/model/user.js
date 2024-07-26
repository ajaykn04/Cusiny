var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean

})

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;