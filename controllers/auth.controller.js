const expressAsyncHandler = require("express-async-handler");
const { successResponseMessage, failureResponseMessage, successResponseData } = require("../configs/response/response");
const User = require("../models/user.model");
const { encryptText, compareText } = require("../utils/bcrypt/bcrypt")
const { genWebToken } = require("../utils/webToken/webToken")

const signinController = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            failureResponseMessage(res, 400, "Missing required Parameters.", 0);
        }
        else {
            const userExists = await User.findOne({ user_username: username }).select("+user_password");

            if (userExists) {
                if (await compareText(password, userExists.user_password)) {

                    successResponseData(res, 200, { token: await genWebToken({ userExists }, process.env.JWT_SECRET_TOKEN) })
                }
                else {
                    failureResponseMessage(res, 401, "Invalid Credentials.", 0);
                }
            } else {
                failureResponseMessage(res, 401, "Invalid Credentials.", 0);
            }
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const signupController = expressAsyncHandler(async (req, res) => {
    const { name, email, password, role, username, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !username || !confirmPassword) {
            failureResponseMessage(res, 400, "Missing required Parameters.", 0);
        } else {
            if (confirmPassword === password) {
                const userEmailExists = await User.findOne({ user_email: email });
                const userNameExists = await User.findOne({ user_username: username });

                if (userEmailExists || userNameExists) {
                    if (userNameExists) {
                        failureResponseMessage(res, 409, "User with this username is already registered with us. Please Login.", 0);
                    }
                    failureResponseMessage(res, 409, "User with this email id is already registered with us. Please Login.", 0);
                } else {
                    const hashed_password = await encryptText(password);

                    const newUser = new User({ user_name: name, user_email: email, user_role: role, user_username: username, user_password: hashed_password })

                    await newUser.save();

                    successResponseMessage(res, 201, "Your registeration has been done successfully.")
                }
            } else {
                failureResponseMessage(res, 409, "Password and Confirm Password should be same.", 0);
            }
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

const checkAuthToken = expressAsyncHandler(async (req, res) => {
    try {
        successResponseData(res, 200, req.user);
    } catch (err) {
        failureResponseMessage(res, 500, err.message);
    }
})

module.exports = {
    signinController, signupController, checkAuthToken
}