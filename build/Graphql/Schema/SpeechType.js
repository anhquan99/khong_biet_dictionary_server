"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ErrorMessageEnum_1 = require("../../Enums/ErrorMessageEnum");
const _maxStringLength = 100;
const SppechTypeSchema = new mongoose_1.Schema({
    Name: {
        type: String,
        require: true,
        unique: true,
        max: [100, (0, ErrorMessageEnum_1.MaxStringLength)('name', _maxStringLength)]
    },
    Creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    CreatedAt: {
        type: String,
        required: true
    }
});
const SpeechTypeModel = (0, mongoose_1.model)("SpeechType", SppechTypeSchema);
exports.default = SpeechTypeModel;
