const authRouter = require("express").Router();
const { signinController, signupController } = require("../controllers/auth.controller");

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);

module.exports = authRouter;