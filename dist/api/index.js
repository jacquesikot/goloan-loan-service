"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.home = void 0;
var home_1 = require("./routes/home");
Object.defineProperty(exports, "home", { enumerable: true, get: function () { return __importDefault(home_1).default; } });
var users_1 = require("./routes/users");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
//# sourceMappingURL=index.js.map