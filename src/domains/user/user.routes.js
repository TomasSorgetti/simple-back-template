const { Router } = require("express");
const controllers = require("./user.controller");
const userRouter = Router();

userRouter.get("/", controllers.getUser);

module.exports = userRouter;
