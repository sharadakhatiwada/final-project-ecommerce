const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  country: { type: String },
});

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: [addressSchema],
  phoneNumber: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user", "super-admin"],
    default: "user",
  },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
