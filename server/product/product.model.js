const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  images: [String],
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
