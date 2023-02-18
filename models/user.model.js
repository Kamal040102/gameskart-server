const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true, select: false },
    user_username: { type: String, required: true, unique: true },
    user_role: { type: String, required: true, default: "user" }
})

const User = mongoose.model("User", userSchema);

module.exports = User;