"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        max: 20
    },
    email: {
        unique: false,
        type: String,
        required: true,
        min: 10
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 15
    },
    phone: {
        unique: true,
        type: Number,
        required: true,
        maxlength: 11
    },
    token: {
        type: String
    }
});
exports.default = mongoose_1.default.model('user', userSchema);
