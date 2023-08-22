// class User {
//   constructor(id, username, email, password, playType) {
//     this.id = id;
//     this.username = username;
//     this.email = email;
//     this.password = password;
//     this.playType = playType;
//   }
// }
const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number },
  country: { type: String },
});

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: addressSchema },
  phoneNumber: { type: String },
  role: { type: String, enum: ["admin", "user"] },
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
