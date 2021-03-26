import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const payStackApi = process.env.PAYSTACK_API_KEY
  ? process.env.PAYSTACK_API_KEY
  : '';

export default {
  port: parseInt(process.env.PORT, 3000),
  masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
  paystackApiKey: `Bearer ${payStackApi}`,
  goloanUserService: process.env.GOLOAN_USER_SERVICE
    ? process.env.GOLOAN_USER_SERVICE
    : '',
  paystackUrls: {
    initializeTransaction: 'https://api.paystack.co/transaction/initialize',
    verifyTransaction: 'https://api.paystack.co/transaction/verify/',
    transferRecipient: 'https://api.paystack.co/transferrecipient',
  },
};
