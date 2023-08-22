const orderService = require("./order.services");
async function saveNewOrder(req, res, next) {
  try {
    console.log(req.body);
    await orderService.addOrder(req.body);
    res.send("success!");
  } catch (e) {
    next(e);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (e) {
    next(e);
  }
}

async function updateOrder(req, res, next) {
  try {
    const order = await orderService.updateOrder(req.body, req.params.orderId);
    console.log("order === ", order);
    res.send(order);
  } catch (e) {
    next(e);
  }
}

module.exports = { saveNewOrder, updateOrder, getAllOrders };
