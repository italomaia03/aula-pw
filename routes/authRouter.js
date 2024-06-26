const { Router } = require("express");

const authRouter = Router();
const controller = require("../controllers/authController");

authRouter.post("/login", controller.login);
authRouter.post("/register", controller.register);

module.exports = authRouter;
