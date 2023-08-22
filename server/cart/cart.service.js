//CRUD Apartment
const { CartModel: Cart } = require("./cart.model");
async function addNewProduct({ productId, userId }) {
  let cart = await Cart.findOne({ userId });
  if (cart) {
    const productFind = cart.products?.find(
      (product) => product.productId === productId
    );
    if (productFind) {
      productFind.count = productFind.count + 1;
    } else {
      cart.products.push({ productId, count: 1 });
    }
  } else {
    newCart = { userId, products: [{ productId, count: 1 }] };
    cart = await new Cart(newCart);
  }
  await cart.save();
  const cartCount = getCartCount(userId);
  return { cartCount: cart.products.length };
}

async function getCartCount(userId) {
  const cart = await Cart.findOne({ userId });
  return { cartCount: cart?.products?.length };
}

async function getCartProducts({ userId }) {
  console.log(userId);
  let cart = await Cart.findOne({ userId });
  return cart.products;
}
async function updateProductCart(userId, productId, body) {
  return await Cart.updateOne(
    { userId: userId, "products.productId": productId },
    { $set: { "products.$": { count: body.count, productId: productId } } }
  );
}
async function deleteProductCart(userId, productId) {
  await Cart.updateOne(
    { userId },
    {
      $pull: { products: { productId: productId } },
    }
  );
  return await getCartCount(userId);
}
async function deleteProductsCart(userId) {
  console.log("user id == ", userId);
  await Cart.deleteOne({ userId });
  return await getCartCount(userId);
}

module.exports = {
  addNewProduct,
  updateProductCart,
  deleteProductCart,
  getCartProducts,
  getCartCount,
  deleteProductsCart,
};
