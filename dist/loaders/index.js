"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.logger = void 0;
var logger_1 = require("./logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return __importDefault(logger_1).default; } });
var serviceContainer_1 = require("./serviceContainer");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return serviceContainer_1.container; } });
//# sourceMappingURL=index.js.map