//CRUD Apartment
const mongoose = require("mongoose");
const { CartModel: Cart } = require("./cart.model");
const CartService = require("./cart.service");

const stripe = require("stripe")("stripekey");
async function addNewProduct(req, res, next) {
  try {
    const { userId, productId } = req.body;
    let result = await CartService.addNewProduct({ userId, productId });
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const { userId } = req.params;
    let product = await CartService.getCartProducts({ userId });
    res.send(product);
  } catch (err) {
    next(err);
  }
}
async function getAllProducts(req, res, next) {
  try {
    let searchText = req.query.searchText;
    let category = req.query.category;
    let products = await CartService.getAllProducts(searchText, category);
    res.send(products);
  } catch (err) {
    next(err);
  }
}
async function updateProduct(req, res, next) {
  try {
    await CartService.updateProductCart(
      req.params.userId,
      req.params.productId,
      req.body
    );
    res.send("updated");
  } catch (err) {
    next(err);
  }
}
async function deleteProduct(req, res, next) {
  try {
    let result = await CartService.deleteProductCart(
      req.params.userId,
      req.params.productId
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteProducts(req, res, next) {
  try {
    let result = await CartService.deleteProductsCart(req.params.userId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function processPayment(req, res, next) {
  console.log("inside process payment");
  try {
    const { paymentMethodId, amount } = req.body;
    console.log("body ==>> ", req.body);
    try {
      // Create a PaymentIntent using the payment method ID
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Amount in cents (e.g., $10.00)
        currency: "usd", // Currency code (e.g., 'usd', 'eur')
        payment_method: paymentMethodId,
        confirm: true,
      });
      // If the paymentIntent is successful, send a response with the client secret
      res.json({ clientSecret: paymentIntent.client_secret });
      console.log("process completed");
    } catch (error) {
      console.error("Error processing payment:", error);
      res.status(500).json({ error: "Payment processing failed" });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  addNewProduct,
  getProducts,
  deleteProduct,
  deleteProducts,
  getAllProducts,
  updateProduct,
  processPayment,
};
