const express = require("express");
const productController = require("./product.controller");
const { validateRole, validateToken } = require("../middleware/validateToken");
const productRouter = express.Router();

productRouter.post(
  "/",
  validateToken,
  validateRole,
  productController.addNewProduct
);
productRouter.put(
  "/:productId",
  validateToken,
  validateRole,
  productController.updateProduct
);
productRouter.delete(
  "/:productId",
  validateToken,
  validateRole,
  productController.deleteProduct
);
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:productId", productController.getProduct);

//productRouter.get("/session", userController.getSessionUser);

module.exports = productRouter;
