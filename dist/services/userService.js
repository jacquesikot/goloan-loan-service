"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService = ({ prisma, logger }) => {
    const hashValue = (value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedValue = yield bcrypt_1.default.hash(value, salt);
            return hashedValue;
        }
        catch (error) {
            logger.error(error);
        }
    });
    const validatePassword = (givenPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const validPassword = yield bcrypt_1.default.compare(givenPassword, userPassword);
            if (!validPassword)
                return false;
            return true;
        }
        catch (error) {
            logger.error(error);
        }
    });
    const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const { first_name, last_name, phone_number, email, gender, bvn, user_type, password, pin, } = user;
        const safePassword = (yield hashValue(password)).toString();
        const safePin = (yield hashValue(pin)).toString();
        try {
            const user = prisma.users.create({
                data: {
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password: safePassword,
                    pin: safePin,
                    gender,
                    bvn,
                    user_type,
                    created_at: new Date().toISOString(),
                },
            });
            return user;
        }
        catch (error) {
            logger.error(error);
        }
    });
    const checkIfUserExists = (user_email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const foundUser = yield prisma.users.findUnique({
                where: {
                    email: user_email,
                },
            });
            if (!foundUser)
                return false;
            return true;
        }
        catch (error) {
            logger.error(error);
        }
    });
    const findUserByEmail = (user_email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = prisma.users.findUnique({
                where: {
                    email: user_email,
                },
            });
            return user;
        }
        catch (error) {
            logger.error(error);
        }
    });
    const getUserById = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = prisma.users.findUnique({
                where: {
                    id: user_id,
                },
            });
            if (user)
                return user;
        }
        catch (error) {
            logger.error(error);
        }
    });
    return {
        hashValue,
        validatePassword,
        createUser,
        checkIfUserExists,
        findUserByEmail,
        getUserById,
    };
};
exports.default = userService;
//# sourceMappingURL=userService.js.map