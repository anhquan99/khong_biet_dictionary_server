"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusSchema = {
    type: String,
    require: true,
    enum: {
        values: ["submitted", "approved", "rejected", "deleted", "reported"],
        message: "{VALUE} is not supported"
    }
};
exports.default = StatusSchema;
