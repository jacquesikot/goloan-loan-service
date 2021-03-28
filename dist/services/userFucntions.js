"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const userFunctions = () => {
    const getUser = async (user_id) => {
        await axios_1.default.get(config_1.default.goloanUserService + `/${user_id}`);
    };
    return getUser.data.data;
};
//# sourceMappingURL=userFucntions.js.map