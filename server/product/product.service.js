//CRUD Apartment
const Product = require("./product.model");
async function addNewProduct(product) {
  console.log(product);
  const newProduct = await new Product(product);
  let result = await newProduct.save();
  return result;
}

async function getProduct(productId) {
  let product = await Product.findOne({ _id: productId });
  return product;
}
async function getAllProducts(searchText, category) {
  let filter = [];
  if (searchText) {
    filter.push({ name: { $regex: searchText, $options: "i" } });
    filter.push({ details: { $regex: searchText, $options: "i" } });
  }
  if (category) {
    filter.push({ category: { $regex: category, $options: "i" } });
  }
  let criteria = {};
  if (filter.length > 0) {
    criteria = {
      $or: filter,
    };
  }
  let products = await Product.find(criteria);
  return products;
}
async function updateProduct(productId, product) {
  let result = await Product.findOneAndUpdate({ _id: productId }, product);

  return result;
}
async function deleteProduct(productId) {
  return await Product.deleteOne({ _id: productId });
}
module.exports = {
  addNewProduct,
  getProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
};
