"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const validateUser = (user) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(30).required(),
        last_name: Joi.string().min(2).max(30).required(),
        phone_number: Joi.string().min(13).max(21).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(12).required(),
        pin: Joi.string().min(4).max(4).required(),
        gender: Joi.string().min(4).max(6).required(),
        bvn: Joi.string().min(10).max(10).required(),
        user_type: Joi.string().min(1).max(1).required(),
    });
    return schema.validate(user);
};
exports.default = validateUser;
//# sourceMappingURL=userValidation.js.map