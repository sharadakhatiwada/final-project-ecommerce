const mongoose = require("mongoose");
const { cartSchema } = require("../cart/cart.model");

const amountsSchema = mongoose.Schema({
  productsPrice: { type: String, required: true },
  salesTax: { type: String, required: true },
  totalAmount: { type: String, required: true },
});

const addressSchema = mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const orderSchema = mongoose.Schema({
  cart: [{ productId: { type: String }, count: { type: Number } }],
  userId: { type: String, required: true },
  amounts: amountsSchema,
  deliveryAddress: addressSchema,
  status: {
    type: String,
    enum: ["ordered", "shipped", "delivered"],
  },
});

const OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;
