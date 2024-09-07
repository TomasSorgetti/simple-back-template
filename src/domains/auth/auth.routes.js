const { Router } = require("express");
const controllers = require("./auth.controller");
const authRouter = Router();

authRouter.post("/login", controllers.login);
authRouter.post("/register", controllers.register);
authRouter.post("/logout", controllers.logout);
authRouter.post("/refresh", controllers.refresh);

module.exports = authRouter;
