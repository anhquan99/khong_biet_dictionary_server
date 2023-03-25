"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passwordFormat = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
function validatePassword(password) {
    if (!password.match(passwordFormat))
        return false;
    return true;
}
const UserValidation = (password) => {
    return validatePassword(password);
};
exports.default = UserValidation;
