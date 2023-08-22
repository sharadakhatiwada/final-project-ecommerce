const { decode } = require("../utils/encryption");

const validateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    next(new Error("Invalid or Expired token"));
  } else {
    token = token.split(" ")[1];
    const decoded = decode(token);
    req.user = decoded;
    req.user.token = token;

    return next();
  }
};
const validateRole = (req, res, next) => {
  let role = req.user.role;
  if (role == "admin") {
    return next();
  } else {
    return next(new Error("User Not Authorized !"));
  }
};

module.exports = { validateToken, validateRole };
