const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

const genWebToken = expressAsyncHandler(async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
        expiresIn: "1d"
    });
});

const verifyWebToken = expressAsyncHandler(async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_TOKEN);
});

const debugWebToken = expressAsyncHandler(async (token) => {
    return jwt.decode(token);
});

module.exports = {
    genWebToken, verifyWebToken, debugWebToken
}