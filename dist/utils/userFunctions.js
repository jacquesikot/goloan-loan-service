"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const loaders_1 = require("../loaders");
const userFunctions = () => {
    const getUser = async (user_id) => {
        try {
            const user = await axios_1.default.get(config_1.default.goloanUserService + `/${user_id}`);
            return user.data.data;
        }
        catch (error) {
            loaders_1.logger.error(error);
        }
    };
    return {
        getUser,
    };
};
const userFunction = userFunctions();
exports.default = userFunction;
//# sourceMappingURL=userFunctions.js.map