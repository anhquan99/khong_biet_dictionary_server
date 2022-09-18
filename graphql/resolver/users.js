const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { validatePassword } = require("../../Validator/UserValidator");
const { generateToken } = require("../../Authentication/Token");
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
      var token = generateToken(loginUser);
      return {
        ...loginUser._doc,
        Id: loginUser._id,
        token
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
      if (!validatePassword(Password)) {
        throw new Error(
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        );
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
