"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Comment_1 = __importDefault(require("./Attribute/Comment"));
const Status_1 = __importDefault(require("./Attribute/Status"));
const Vote_1 = __importDefault(require("./Attribute/Vote"));
const MeaningSchema = new mongoose_1.Schema({
    Meaning: {
        type: String,
        require: true
    },
    Creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    Word: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "Word"
    },
    Example: {
        type: [String],
        require: false
    },
    CreatedAt: {
        type: String,
        require: true
    },
    Status: Status_1.default,
    IsSlang: {
        type: Boolean,
        require: true
    },
    Votes: [Vote_1.default],
    Comments: [Comment_1.default],
    SpeechType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SpeechType",
        require: false
    }
});
const MeaningModel = (0, mongoose_1.model)("Meaning", MeaningSchema);
exports.default = MeaningModel;
