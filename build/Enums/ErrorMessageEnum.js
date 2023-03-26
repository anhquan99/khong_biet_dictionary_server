"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidField = exports.MaxStringLength = void 0;
function MaxStringLength(fieldName, maxLength) {
    return `The max length of ${fieldName} is ${maxLength}`;
}
exports.MaxStringLength = MaxStringLength;
function InvalidField(fieldName) {
    return `Invalid ${fieldName}`;
}
exports.InvalidField = InvalidField;
