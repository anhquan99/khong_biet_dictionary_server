const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    async login(_, { Username, Password }) {
      const loginUser = await User.findOne({ Username });
      if (!loginUser) {
        throw new Error("user not found");
      }
      const match = await bcrypt.compare(Password, loginUser.Password);
      if (!match) {
        throw new Error("Wrong crendetials");
      }
      console.log(loginUser._id);
      return {
        ...loginUser._doc,
        ID: loginUser._id
      };
    }
  },
  Mutation: {
    async register(
      _,
      {
        userInput: { Username, Email, Password, Role }
      }
    ) {
      const oldUser = await User.findOne({ Username, Email });
      if (oldUser) {
        throw new Error("user is taken");
      }
      var salt = await bcrypt.genSalt(Math.floor(Math.random() * 5));
      Password = await bcrypt.hash(Password, salt);
      const newUser = new User({
        Username: Username,
        Email: Email,
        Password: Password,
        Role: Role,
        Level: 0
      });
      const tempNewUser = await newUser.save();
      return tempNewUser;
    }
  }
};
