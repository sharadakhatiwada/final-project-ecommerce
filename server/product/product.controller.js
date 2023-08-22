//CRUD Apartment
const mongoose = require("mongoose");
const Product = require("./product.model");
const ProductService = require("./product.service");
async function addNewProduct(req, res, next) {
  try {
    const product = req.body;
    let result = await ProductService.addNewProduct(product);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    let product = await ProductService.getProduct(req.params.productId);
    console.log("product =====>> ", product);
    res.send(product);
  } catch (err) {
    next(err);
  }
}
async function getAllProducts(req, res, next) {
  try {
    let searchText = req.query.searchText;
    let category = req.query.category;
    let products = await ProductService.getAllProducts(searchText, category);
    res.send(products);
  } catch (err) {
    next(err);
  }
}
async function updateProduct(req, res, next) {
  try {
    let result = await ProductService.updateProduct(
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
    let result = await ProductService.deleteProduct(req.params.productId);
    res.send(result);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  addNewProduct,
  getProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
};
