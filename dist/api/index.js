"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferRecipient = exports.cardVerify = exports.home = void 0;
var home_1 = require("./routes/home");
Object.defineProperty(exports, "home", { enumerable: true, get: function () { return __importDefault(home_1).default; } });
var cardVerify_1 = require("./routes/cardVerify");
Object.defineProperty(exports, "cardVerify", { enumerable: true, get: function () { return __importDefault(cardVerify_1).default; } });
var transferRecipient_1 = require("./routes/transferRecipient");
Object.defineProperty(exports, "transferRecipient", { enumerable: true, get: function () { return __importDefault(transferRecipient_1).default; } });
//# sourceMappingURL=index.js.map