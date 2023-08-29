const mongoose = require("mongoose");
const userSchemaa = new mongoose.Schema({
  name: { type: String },
  phone: { type: Number },
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const user_model = mongoose.model("users", userSchemaa);
module.exports = user_model;
