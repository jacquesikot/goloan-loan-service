"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const config_1 = __importDefault(require("../config"));
const masterAuth = (req, res, next) => {
    const key = req.headers[constants_1.httpHeaders.masterKey];
    if (!key) {
        const code = 401;
        res.status(code);
        res.json(constants_1.errorEnvelope.genericError(constants_1.errorMessage.noMasterKey, code));
        return;
    }
    if (key === config_1.default.masterKey) {
        return next();
    }
    else {
        const code = 400;
        res.status(code);
        res.json(constants_1.errorEnvelope.genericError(constants_1.errorMessage.invalidMasterKey, code));
        return;
    }
};
exports.default = masterAuth;
//# sourceMappingURL=masterAuth.js.map