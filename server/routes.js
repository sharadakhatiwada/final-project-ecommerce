const express = require("express");
const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const { validateToken, validateRole } = require("./middleware/validateToken");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", validateToken, userRouter);

module.exports = router;
