"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("../utils");
const transferRecipientService = ({ prisma, logger }) => {
    const options = {
        headers: {
            Authorization: config_1.default.paystackApiKey,
            'Content-Type': 'application/json',
        },
    };
    const verifyAccountNumber = async (data) => {
        try {
            const user = await utils_1.userFunctions.getUser(data.user_id);
            const response = await axios_1.default.get(config_1.default.paystackUrls.resolveAccountNumber +
                `account_number=${data.account_number}&bank_code=${data.bank_code}`, options);
            const account_name = response.data.data.account_name.toString();
            if (account_name.includes(user.first_name.toUpperCase()))
                return response.data.data;
        }
        catch (error) {
            logger.error(error);
        }
    };
    const addTransferRecipient = async (data) => {
        try {
            const verified = await verifyAccountNumber(data);
            if (verified) {
                const recepientData = {
                    type: 'nuban',
                    name: data.user_id,
                    account_number: data.account_number,
                    bank_code: data.bank_code,
                };
                const response = await axios_1.default.post(config_1.default.paystackUrls.transferRecipient, recepientData, options);
                if (response.data.data.active === true) {
                    const newTransferRecipient = await prisma.transfer_recipient.create({
                        data: {
                            user_id: data.user_id,
                            type: 'nuban',
                            account_number: data.account_number,
                            bank_code: data.bank_code,
                            currency: 'NGN',
                            created_at: new Date().toISOString(),
                        },
                    });
                    return newTransferRecipient;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (error) {
            logger.error(error);
        }
    };
    const getTransferRecipients = async () => {
        try {
            const transferRecipients = await prisma.transfer_recipient.findMany({});
            return transferRecipients;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        verifyAccountNumber,
        addTransferRecipient,
        getTransferRecipients,
    };
};
exports.default = transferRecipientService;
//# sourceMappingURL=transferRecipientService.js.map