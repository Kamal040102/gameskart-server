const authRouter = require("express").Router();
const { signinController, signupController, checkAuthToken } = require("../controllers/auth.controller");
const { checkAdminAuth, checkAuth } = require("../middlewares/auth.middleware");

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);
authRouter.get("/", checkAuth, checkAuthToken)

module.exports = authRouter;