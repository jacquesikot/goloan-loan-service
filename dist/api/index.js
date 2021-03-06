"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flutterwaveWebhook = exports.webhook = exports.transferRecipient = exports.cardVerify = exports.home = void 0;
var home_1 = require("./routes/home");
Object.defineProperty(exports, "home", { enumerable: true, get: function () { return __importDefault(home_1).default; } });
var cardVerify_1 = require("./routes/cardVerify");
Object.defineProperty(exports, "cardVerify", { enumerable: true, get: function () { return __importDefault(cardVerify_1).default; } });
var transferRecepient_1 = require("./routes/transferRecepient");
Object.defineProperty(exports, "transferRecipient", { enumerable: true, get: function () { return __importDefault(transferRecepient_1).default; } });
var webhook_1 = require("./routes/webhook");
Object.defineProperty(exports, "webhook", { enumerable: true, get: function () { return __importDefault(webhook_1).default; } });
var flutterwaveWebhook_1 = require("./routes/flutterwaveWebhook");
Object.defineProperty(exports, "flutterwaveWebhook", { enumerable: true, get: function () { return __importDefault(flutterwaveWebhook_1).default; } });
//# sourceMappingURL=index.js.map