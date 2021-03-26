import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 3000),
  masterKey: process.env.MASTER_KEY ? process.env.MASTER_KEY : '',
};
