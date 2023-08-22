const mongoose = require("mongoose");
const User = require("./user.model");
const { hash } = require("../utils/encryption");
const authService = require("../auth/auth.service");

const updateUser = async (userId, updatedUser) => {
  const id = new mongoose.Types.ObjectId(userId);
  await User.findOneAndUpdate(
    { _id: id },
    { $set: { email: updatedUser.email, username: updatedUser.username } }
  );
};
const getUser = async (userId) => {
  if (userId) {
    const user = await User.findOne({ userId });
    return [user];
  } else {
    const users = await User.find();
    return users;
  }
};
const createUser = async (user) => {
  const { email, password } = user;
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new Error("User Already Exist!");
  }
  user.password = hash(password);
  await User.create(user);
  return authService.login(email, password);
};

module.exports = { updateUser, getUser, createUser };
