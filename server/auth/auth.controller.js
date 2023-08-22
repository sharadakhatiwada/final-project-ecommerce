const authService = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body.email, req.body.password);
    return res.json(user);
  } catch (error) {
    next(error);
  }
};
const signup = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signup };
