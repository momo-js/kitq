"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var posts_1 = require("../controllers/posts");
var auth_1 = require("../middleware/auth");
var router = express_1["default"].Router();
router.get('/', auth_1.verifyToken, posts_1.getFeed);
router.get('/hot', auth_1.verifyToken, posts_1.getFeedHot);
router.post('/create', auth_1.verifyToken, posts_1.createPost);
router.patch('/:id/like', auth_1.verifyToken, posts_1.likePost);
exports["default"] = router;
