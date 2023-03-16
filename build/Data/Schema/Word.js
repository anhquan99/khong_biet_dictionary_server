"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordModel = void 0;
const mongoose_1 = require("mongoose");
const wordSchema = new mongoose_1.Schema({
    Characters: {
        type: String,
        require: true,
        validate: {
            validator: (word) => {
                return word.match(/^[A-Z]+$/i);
            },
            message: "Invalid word"
        },
        unique: true
    },
    Username: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: String,
        require: true
    },
    NumberOfSearch: {
        type: Number,
        require: true
    },
    IsDictionary: {
        type: Boolean,
        require: true
    },
    User: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.WordModel = (0, mongoose_1.model)("Word", wordSchema);
