const { model, Schema } = require("mongoose");
const emailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new Schema({
  Username: {
    type: String,
    require: [true, "Username is required!"],
    max: [500, "Username max is 500 character!"],
    unique: true
  },
  Email: {
    type: String,
    require: [true, "Email is required!"],
    max: [500, "Email max is 500 characters"],
    validate: {
      validator: email => {
        return email.match(emailFormat);
      },
      message: "Email is not correct!"
    },
    unique: true
  },
  Password: {
    type: String,
    require: [true, "Password is required!"]
  },
  Role: {
    type: String,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not supported"
    },
    require: true
  },
  Level: {
    type: Number,
    require: true
  }
});

module.exports = model("User", userSchema);
