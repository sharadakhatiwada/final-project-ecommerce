const mongoose = require("mongoose");
const User = require("./user.model");

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
  const { email } = user;
  const findUser = await userModel.findOne(email);
  if (findUser) {
    throw new Error("User Already Exist!");
  }
  let newUSer = await userModel.create(user);
};

module.exports = { updateUser, getUser, createUser };
