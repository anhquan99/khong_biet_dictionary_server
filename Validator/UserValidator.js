const passwordFormat =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
module.exports = {
  validatePassword(password) {
    if (!password.match(passwordFormat)) return false;
    return true;
  }
};
