"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PharseSchema = new mongoose_1.Schema({
    Pharse: {
        type: String,
        require: true
    },
    Creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    CreatedAt: {
        type: String,
        require: true
    },
    Words: [String]
});
const PharseModel = (0, mongoose_1.model)("Pharse", PharseSchema);
exports.default = PharseModel;
