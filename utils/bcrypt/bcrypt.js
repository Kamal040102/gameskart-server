const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

const encryptText = expressAsyncHandler(async (text) => {
    return bcrypt.hash(text, 12)
})

const compareText = expressAsyncHandler(async (text, hashedText) => {
    console.log(text, hashedText)
    return bcrypt.compare(text, hashedText)
})

module.exports = {
    encryptText, compareText
}