"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    port: parseInt(process.env.PORT, 3000),
    masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
};
//# sourceMappingURL=index.js.map