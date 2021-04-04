"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const loaders_1 = require("../loaders");
const config_1 = __importDefault(require("../config"));
const transactionService = ({ prisma, logger }) => {
    const options = {
        headers: {
            Authorization: config_1.default.paystackApiKey,
            'Content-Type': 'application/json',
        },
    };
    const optionsFlutterwave = {
        headers: {
            Authorization: config_1.default.flutterwaveSecKey,
            'Content-Type': 'application/json',
        },
    };
    const transferFunds = async (user_id, narration, amount) => {
        try {
            const recepient = await loaders_1.container.transferRecepientService.getSingleRecepient(user_id);
            const reference = `REF/TRF/OUT/TEST3`; // Check ref here
            const data = {
                account_bank: recepient.bank_code,
                account_number: recepient.account_number,
                amount,
                narration,
                currency: 'NGN',
                reference,
                debit_currency: 'NGN',
            };
            const transfer = await axios_1.default.post(config_1.default.flutterwaveUrls.initiateTransfer, data, optionsFlutterwave);
            if (transfer.data.status === 'success' &&
                transfer.data.message === 'Transfer Queued Successfully') {
                const savedTransfer = await prisma.transfer.create({
                    data: {
                        user_id,
                        amount,
                        narration,
                        created_at: new Date().toISOString(),
                        reference,
                        verified: false,
                    },
                });
                return savedTransfer;
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    const verifyTransaction = async (reference) => {
        try {
            const verified = await axios_1.default.get(config_1.default.paystackUrls.verifyTransaction + `${reference}`, options);
            return verified;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addAuthorization = async (cardAuth) => {
        try {
            const auth = await prisma.card_authorization.create({
                data: {
                    user_id: cardAuth.user_id,
                    account_name: cardAuth.account_name ? cardAuth.account_name : '',
                    authorization_code: cardAuth.authorization_code,
                    bank: cardAuth.bank,
                    bin: cardAuth.bin,
                    card_type: cardAuth.card_type,
                    channel: cardAuth.channel,
                    country_code: cardAuth.country_code,
                    exp_month: cardAuth.exp_month,
                    exp_year: cardAuth.exp_year,
                    last4: cardAuth.last4,
                    reusable: cardAuth.reusable,
                    signature: cardAuth.signature,
                },
            });
            return auth;
        }
        catch (error) {
            console.log(error);
        }
    };
    const refundInitAmount = async (reference) => {
        try {
            const verified = await verifyTransaction(reference);
            // console.log(verified.data.data.authorization); // test with bad reference and bad transaction reference
            if (verified.data.data.status === 'success') {
                const ref = await prisma.card_verification.findUnique({
                    where: {
                        reference,
                    },
                });
                if (ref) {
                    const foundAuth = await prisma.card_authorization.findUnique({
                        where: {
                            user_id: ref.user_id,
                        },
                    });
                    if (!foundAuth) {
                        const auth = verified.data.data.authorization;
                        const cardAuth = {
                            user_id: ref.user_id,
                            account_name: auth.account_name,
                            authorization_code: auth.authorization_code,
                            bank: auth.bank,
                            bin: auth.bin,
                            card_type: auth.card_type,
                            channel: auth.channel,
                            country_code: auth.country_code,
                            exp_month: auth.exp_month,
                            exp_year: auth.exp_year,
                            last4: auth.last4,
                            reusable: auth.reusable,
                            signature: auth.signature,
                        };
                        await addAuthorization(cardAuth);
                    }
                    await prisma.card_verification.update({
                        where: {
                            user_id: ref.user_id,
                        },
                        data: {
                            verified: true,
                        },
                    });
                    await transferFunds(ref.user_id, 'refund of card init fee', config_1.default.initChargeAmount);
                    return;
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    return {
        refundInitAmount,
        transferFunds,
    };
};
exports.default = transactionService;
//# sourceMappingURL=transactionService.js.map