"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const cardVerifyService = ({ logger, prisma }) => {
    const options = {
        headers: {
            Authorization: config_1.default.paystackApiKey,
            'Content-Type': 'application/json',
        },
    };
    const initiateCardVerification = async (user_id) => {
        try {
            const foundVerification = await prisma.card_verification.findUnique({
                where: {
                    user_id,
                },
            });
            if (foundVerification) {
                const user = await axios_1.default.get(config_1.default.goloanUserService + `/${user_id}`);
                const userData = user.data.data;
                const data = {
                    email: userData.email,
                    amount: '5000',
                };
                const response = await axios_1.default.post(config_1.default.paystackUrls.initializeTransaction, data, options);
                const paystackResponse = response.data.data;
                const modifiedValue = () => {
                    if (foundVerification.modified !== null) {
                        const value = Number(foundVerification.modified) + 1;
                        return value.toString();
                    }
                    else
                        return '1';
                };
                await prisma.card_verification.update({
                    where: {
                        user_id,
                    },
                    data: {
                        authorization_url: paystackResponse.authorization_url,
                        access_code: paystackResponse.access_code,
                        updated_at: new Date().toISOString(),
                        modified: modifiedValue(),
                    },
                });
                return {
                    authorization_url: paystackResponse.authorization_url,
                };
            }
            else {
                const user = await axios_1.default.get(config_1.default.goloanUserService + `/${user_id}`);
                const userData = user.data.data;
                const data = {
                    email: userData.email,
                    amount: '5000',
                };
                const response = await axios_1.default.post(config_1.default.paystackUrls.initializeTransaction, data, options);
                const paystackResponse = response.data.data;
                await prisma.card_verification.create({
                    data: {
                        user_id: userData.id,
                        authorization_url: paystackResponse.authorization_url,
                        access_code: paystackResponse.access_code,
                        reference: `REF/INIT/${Date.now().toString()}/${user_id}`,
                        verified: false,
                        created_at: new Date().toISOString(),
                    },
                });
                return {
                    authorization_url: paystackResponse.authorization_url,
                };
            }
        }
        catch (error) {
            logger.info(error);
        }
    };
    const getVerifications = async () => {
        try {
            const verifications = await prisma.card_verification.findMany({});
            return verifications;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        initiateCardVerification,
        getVerifications,
    };
};
exports.default = cardVerifyService;
//# sourceMappingURL=cardVerifyService.js.map