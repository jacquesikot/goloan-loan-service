"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
const payStackApi = process.env.PAYSTACK_API_KEY
    ? process.env.PAYSTACK_API_KEY
    : '';
const flutterwaveSec = process.env.FLUTTERWAVE_SECRET_KEY
    ? process.env.FLUTTERWAVE_SECRET_KEY
    : '';
exports.default = {
    port: parseInt(process.env.PORT, 3000),
    masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
    paystackApiKey: `Bearer ${payStackApi}`,
    goloanUserService: process.env.GOLOAN_USER_SERVICE
        ? process.env.GOLOAN_USER_SERVICE
        : '',
    agendaDb: process.env.AGENDA_MONGODB_URL
        ? process.env.AGENDA_MONGODB_URL
        : '',
    flutterwaveSecKey: `Bearer ${flutterwaveSec}`,
    flutterwaveUrls: {
        initiateTransfer: 'https://api.flutterwave.com/v3/transfers',
    },
    initChargeAmount: '5000',
    paystackUrls: {
        initializeTransaction: 'https://api.paystack.co/transaction/initialize',
        verifyTransaction: 'https://api.paystack.co/transaction/verify/',
        transferRecipient: 'https://api.paystack.co/transferrecipient',
        resolveAccountNumber: 'https://api.paystack.co/bank/resolve?',
        initiateTransfer: 'https://api.paystack.co/transfer',
    },
    agendaJobs: {
        refundInitAmount: 'refund init amount',
    },
    axiosConfig: {
        options: {
            headers: {
                Authorization: process.env.PAYSTACK_API_KEY,
                'Content-Type': 'application/json',
            },
        },
    },
};
//# sourceMappingURL=index.js.map