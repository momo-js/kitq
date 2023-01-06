"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.likePost = exports.getFeedHot = exports.getFeed = exports.createPost = void 0;
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
// create
var createPost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, title, picturePath, user, newPost, post, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, userId = _a.userId, title = _a.title, picturePath = _a.picturePath;
                return [4 /*yield*/, User_1["default"].findById(userId)];
            case 1:
                user = _b.sent();
                newPost = new Post_1["default"]({
                    userId: userId,
                    login: user === null || user === void 0 ? void 0 : user.login,
                    title: title,
                    picturePath: picturePath,
                    likes: {}
                });
                return [4 /*yield*/, newPost.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, Post_1["default"].find()];
            case 3:
                post = _b.sent();
                res.status(201).json(post);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                res.status(409).json({ message: err_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
// read
var getFeed = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1["default"].find()];
            case 1:
                post = _a.sent();
                res.status(200).json(post);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(404).json({ message: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFeed = getFeed;
var getFeedHot = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post_1, hotPosts_1, filterHot, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1["default"].find()];
            case 1:
                post_1 = _a.sent();
                hotPosts_1 = [];
                filterHot = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        post_1.map(function (item) {
                            // @ts-ignore
                            if (item.likes.size >= 2) {
                                // @ts-ignore
                                hotPosts_1.push(item);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); };
                filterHot();
                res.status(200).json(hotPosts_1);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).json({ message: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getFeedHot = getFeedHot;
// export const getFeedHot = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const post = await Post.find({
//       $where: function() {
//         return Object.keys(this.likes).length >= 5;
//       },
//     });
//     res.status(200).json(post);
//   } catch (err: any) {
//     res.status(404).json({ message: err.message });
//   }
// };
// update
var likePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userId, post, isLiked, updatedPost, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                userId = req.body.userId;
                return [4 /*yield*/, Post_1["default"].findById(id)];
            case 1:
                post = _a.sent();
                isLiked = post.likes.get(userId);
                console.log(isLiked);
                if (isLiked) {
                    post.likes["delete"](userId);
                    console.log("first");
                }
                else {
                    post.likes.set(userId, true);
                    console.log("second");
                }
                return [4 /*yield*/, Post_1["default"].findByIdAndUpdate(id, { likes: post.likes }, { "new": true })];
            case 2:
                updatedPost = _a.sent();
                res.status(200).json(updatedPost);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(404).json({ message: err_4.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
