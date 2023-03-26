"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNullOrEmptyString = void 0;
function IsNullOrEmptyString(str) {
    return str === null || str.trim() === '';
}
exports.IsNullOrEmptyString = IsNullOrEmptyString;
