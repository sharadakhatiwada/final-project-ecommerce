const express = require("express");
const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router");
const productRouter = require("./product/product.router");
const cartRouter = require("./cart/cart.router");
const { validateToken, validateRole } = require("./middleware/validateToken");
const orderRouter = require("./order/order.routes");

const router = express.Router();

router.use("/", authRouter);
router.use("/users", validateToken, userRouter);
router.use("/products", productRouter);
router.use("/products/carts", validateToken, cartRouter);
router.use("/orders", validateToken, orderRouter);

module.exports = router;
