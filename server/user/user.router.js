const express = require("express");
const userController = require("./user.controller");
const { validateRole } = require("../middleware/validateToken");
const userRouter = express.Router();

userRouter.post("/:userId", validateRole, userController.updateUser);
userRouter.post("/", userController.createUser);
userRouter.get("/", validateRole, userController.getUser);
userRouter.get("/session/user", userController.getSessionUser);

module.exports = userRouter;
