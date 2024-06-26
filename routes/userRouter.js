const { Router } = require("express");

const userRouter = Router();
const userAuthMiddleware = require("../middlewares/authenticateUser");

const userController = require("../controllers/userController");

userRouter.get("/users", userAuthMiddleware, userController.getAll);

module.exports = userRouter;
