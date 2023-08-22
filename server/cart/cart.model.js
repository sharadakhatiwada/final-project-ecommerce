const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  products: [{ productId: String, count: Number }],
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel, cartSchema };
