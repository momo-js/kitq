"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.login = exports.register = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/* REGISTER USER */
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, login_1, pass, user, salt, passwordHash, newUser, savedUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, login_1 = _a.login, pass = _a.pass;
                return [4 /*yield*/, User_1["default"].findOne({ login: login_1 })];
            case 1:
                user = _b.sent();
                if (user)
                    return [2 /*return*/, res.status(400).json({ msg: "User already exists." })];
                return [4 /*yield*/, bcrypt_1["default"].genSalt()];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1["default"].hash(pass, salt)];
            case 3:
                passwordHash = _b.sent();
                newUser = new User_1["default"]({
                    login: login_1,
                    pass: passwordHash
                });
                return [4 /*yield*/, newUser.save()];
            case 4:
                savedUser = _b.sent();
                res.status(201).json(__assign(__assign({}, savedUser), { message: 'Account created!' }));
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                res.status(500).json({ error: err_1.message });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, login_2, pass, user, isMatch, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, login_2 = _a.login, pass = _a.pass;
                return [4 /*yield*/, User_1["default"].findOne({ login: login_2 })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(400).json({ msg: "User does not exist." })];
                return [4 /*yield*/, bcrypt_1["default"].compare(pass, user.pass)];
            case 2:
                isMatch = _b.sent();
                if (!isMatch)
                    return [2 /*return*/, res.status(400).json({ msg: "Invalid credentials." })];
                token = jsonwebtoken_1["default"].sign({ id: user._id }, process.env.JWT_SECRET);
                // @ts-ignore
                delete user.pass;
                res.status(200).json({ token: token, user: user });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status(500).json({ error: err_2.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
