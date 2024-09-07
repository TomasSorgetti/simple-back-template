const { Router } = require("express");

const routes = Router();

routes.use("/user", require("./domains/user/user.routes"));

module.exports = routes;
