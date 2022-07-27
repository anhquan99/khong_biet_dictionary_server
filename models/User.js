const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  Username: String,
  Email: String,
  Password: String,
  Role: String,
  Level: Number
});

module.exports = model("User", userSchema);
