const Order = require("./order.model");
async function addOrder(order) {
  console.log("order ===>>  ", order);
  return await Order.create(order);
}
async function getAllOrders() {
  console.log("hellllloooooo");
  const result = await Order.find();
  console.log(result);
  return result;
}
async function updateOrder(order, orderId) {
  console.log(order, orderId);
  return await Order.updateOne(
    { _id: orderId },
    { $set: { status: order.status } }
  );
}
module.exports = { addOrder, getAllOrders, updateOrder };
