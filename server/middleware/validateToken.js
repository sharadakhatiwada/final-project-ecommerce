const { decode } = require("../utils/encryption");

const validateToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    next(new Error("Invalid or Expired token"));
  } else {
    token = token.split(" ")[1];
    const decoded = decode(token);
    req.user = decoded;

    return next();
  }
};
const validateRole = (req, res, next) => {
  let role = req.user.role;
  console.log(req.user, role);
  if (role == "admin") {
    return next();
  } else {
    return next(new Error("User Not Authorized !"));
  }
};

module.exports = { validateToken, validateRole };
