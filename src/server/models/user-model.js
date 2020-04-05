const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     googleId: String,
//     displayName: String,
//     email: String,
//     photo: String,
//     username: String,
//     password: String
// });

const userSchema = new Schema({
    name: String,
    id: String,
    password: String,
    photo: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
