const User = require("../../models/User");
module.exports = {
  Mutation: {
    async createUser(_, data) {
      const newUser = new User({
        Username: data.userInput.Username,
        Email: data.userInput.Email,
        Password: data.userInput.Password,
        Role: data.userInput.Role,
        Level: 0
      });
      const tempNewUser = await newUser.save();
      return tempNewUser;
    }
  }
};
