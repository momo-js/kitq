"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1["default"].Schema({
    userId: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    title: String,
    picturePath: String,
    likes: {
        type: Map,
        of: Boolean
    }
}, { timestamps: true });
var Post = mongoose_1["default"].model("Post", postSchema);
exports["default"] = Post;
