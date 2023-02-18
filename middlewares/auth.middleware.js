const expressAsyncHandler = require("express-async-handler");
const { failureResponseMessage } = require("../configs/response/response");
const { verifyWebToken, debugWebToken } = require("../utils/webToken/webToken");

const checkAuth = expressAsyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization) {
            if (authorization?.startsWith("Bearer")) {
                const token = authorization.split(" ")[1];

                if (await verifyWebToken(token, process.env.JWT_SECRET_TOKEN)) {
                    req.user = await debugWebToken(token)
                    next();
                } else {
                    failureResponseMessage(res, 403, "Invalid Token or Expired.", 0)
                }
            } else {
                failureResponseMessage(res, 403, "Invalid Token Format.", 0)
            }
        } else {
            failureResponseMessage(res, 403, "Token isn't provided.", 0)
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message)
    }
})

const checkAdminAuth = expressAsyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (authorization) {
            if (authorization?.startsWith("Bearer")) {
                const token = authorization.split(" ")[1];

                if (await verifyWebToken(token, process.env.JWT_SECRET_TOKEN)) {
                    req.user = await debugWebToken(token);
                    if (req.user.userExists.user_role === "admin") {
                        next();
                    } else {
                        failureResponseMessage(res, 403, "You're not authorized to perform this action.", 0)
                    }
                } else {
                    failureResponseMessage(res, 403, "Invalid Token or Expired.", 0)
                }
            } else {
                failureResponseMessage(res, 403, "Invalid Token Format.", 0)
            }
        } else {
            failureResponseMessage(res, 403, "Token isn't provided.", 0)
        }
    }
    catch (err) {
        failureResponseMessage(res, 500, err.message)
    }
})

module.exports = {
    checkAuth,
    checkAdminAuth
}