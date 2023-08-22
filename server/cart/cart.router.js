const express = require("express");
const cartController = require("./cart.controller");
const { validateRole } = require("../middleware/validateToken");
const cartRouter = express.Router();

cartRouter.post("/", cartController.addNewProduct);
// cartRouter.put("/cart/:userId", validateRole, cartController.updateProduct);
cartRouter.delete("/:userId/:productId", cartController.deleteProduct);
cartRouter.delete("/:userId", cartController.deleteProducts);
cartRouter.get("/:userId", cartController.getProducts);
cartRouter.put("/:userId/:productId", cartController.updateProduct);
cartRouter.post("/payment", cartController.processPayment);

//productRouter.get("/session", userController.getSessionUser);

module.exports = cartRouter;
