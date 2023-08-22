const { compare, jwtSign, hash } = require("../utils/encryption");
const UserModel = require("../user/user.model");

const login = async (username, password) => {
  const currentUser = await UserModel.findOne({ email: username });

  if (!currentUser) {
    throw new Error("Invalid username!");
  }

  if (!compare(password, currentUser.password)) {
    throw new Error("Invalid password!");
  }

  const accessToken = jwtSign(currentUser);

  return {
    id: currentUser.id,
    email: currentUser.email,
    role: currentUser.role,
    accessToken,
  };
};

module.exports = { login };
