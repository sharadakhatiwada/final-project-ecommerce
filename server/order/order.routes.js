const express = require("express");
const orderController = require("./order.controller");
const orderRouter = express.Router();

orderRouter.post("/", orderController.saveNewOrder);
orderRouter.put("/:orderId", orderController.updateOrder);

orderRouter.get("/", orderController.getAllOrders);

//productRouter.get("/session", userController.getSessionUser);

module.exports = orderRouter;
