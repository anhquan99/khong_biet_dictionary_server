"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = {
    Comment: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: String,
        require: true
    },
    Creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
};
exports.default = CommentSchema;
