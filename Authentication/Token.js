const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = {
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.Email,
        username: user.Username
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  }
};
