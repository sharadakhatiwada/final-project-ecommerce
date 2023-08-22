const express = require("express");
const userController = require("./user.controller");
const { validateRole } = require("../middleware/validateToken");
const userService = require("./user.service");
const userRouter = express.Router();

userRouter.post("/:userId", validateRole, userController.updateUser);
userRouter.post("/:userId", validateRole, userService.createUser);

userRouter.get("/", validateRole, userController.getUser);
userRouter.get("/session", userController.getSessionUser);

module.exports = userRouter;
