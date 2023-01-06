"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var auth_1 = __importDefault(require("./routes/auth"));
var posts_1 = __importDefault(require("./routes/posts"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, helmet_1["default"])());
app.use(helmet_1["default"].crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1["default"])("common"));
//@ts-ignore
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1["default"])());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/auth', auth_1["default"]);
app.use('/posts', posts_1["default"]);
mongoose_1["default"].set("strictQuery", true);
var PORT = process.env.PORT || 3001;
mongoose_1["default"]
    .connect(process.env.MONGO_URL)
    .then(function () {
    console.log("listening on: ".concat(PORT));
    app.listen(PORT);
})["catch"](function () {
    console.error("failed to connect to mongo");
});
