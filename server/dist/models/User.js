"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1["default"].Schema({
    login: {
        type: String,
        required: true,
        min: 2,
        max: 11,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    color: {
        type: String,
        required: false,
        "default": 'default'
    }
}, { timestamps: true });
var User = mongoose_1["default"].model("User", UserSchema);
exports["default"] = User;
