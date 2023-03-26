"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookmarkSchema = new mongoose_1.Schema({
    Creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    CreatedAt: {
        type: String,
        require: true
    }
});
const BookMarkModel = (0, mongoose_1.model)("Bookmark", BookmarkSchema);
exports.default = BookMarkModel;
