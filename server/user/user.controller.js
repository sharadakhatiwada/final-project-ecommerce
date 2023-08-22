const { async } = require("rxjs");
const userService = require("./user.service");
const cartService = require("../cart/cart.service");
const userModel = require("./user.model");

const updateUser = async (req, res, next) => {
  try {
    return res.json(await userService.updateUser(req.params.userId, req.body));
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    res.json(await userService.getUser(req.query.userId));
  } catch (error) {
    next(error);
  }
};

const getSessionUser = async (req, res, next) => {
  try {
    req.user.cartCount = (
      await cartService.getCartCount(req.user.id)
    ).cartCount;
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, getUser, getSessionUser };
