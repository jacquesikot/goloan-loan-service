"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpHeaders = exports.responseEnvelope = exports.errorMessage = exports.errorEnvelope = void 0;
var errors_1 = require("./errors");
Object.defineProperty(exports, "errorEnvelope", { enumerable: true, get: function () { return errors_1.errorEnvelope; } });
Object.defineProperty(exports, "errorMessage", { enumerable: true, get: function () { return errors_1.errorMessage; } });
var response_1 = require("./response");
Object.defineProperty(exports, "responseEnvelope", { enumerable: true, get: function () { return __importDefault(response_1).default; } });
exports.httpHeaders = {
    masterKey: 'x-master-key',
};
//# sourceMappingURL=index.js.map