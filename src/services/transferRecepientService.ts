import axios from 'axios';
import config from '../config';
import { IServiceInterface, ITransferRecipient } from '../interfaces';
import { userFunctions } from '../utils';

const transferRecepientService = ({ prisma, logger }: IServiceInterface) => {
  const options = {
    headers: {
      Authorization: config.paystackApiKey,
      'Content-Type': 'application/json',
    },
  };

  const checkTransferRecepient = async (user_id: string) => {
    try {
      const recepient = await prisma.transfer_recipient.findUnique({
        where: {
          user_id,
        },
      });
      if (recepient) return true;
    } catch (error) {
      logger.error(error);
    }
  };

  const verifyAccountNumber = async (data: ITransferRecipient) => {
    try {
      const user = await userFunctions.getUser(data.user_id);
      const response = await axios.get(
        config.paystackUrls.resolveAccountNumber +
          `account_number=${data.account_number}&bank_code=${data.bank_code}`,
        options,
      );
      const account_name = response.data.data.account_name.toString();
      if (account_name.includes(user.first_name.toUpperCase()))
        return response.data.data;
    } catch (error) {
      logger.error(error);
    }
  };

  // TODO: Check similar acc number and return error

  const addTransferRecepient = async (data: ITransferRecipient) => {
    try {
      const verified = await verifyAccountNumber(data);
      if (verified) {
        const recepientData = {
          type: 'nuban',
          name: data.user_id,
          account_number: data.account_number,
          bank_code: data.bank_code,
        };
        const response = await axios.post(
          config.paystackUrls.transferRecipient,
          recepientData,
          options,
        );

        if (response.data.data.active === true) {
          const newTransferRecipient = await prisma.transfer_recipient.create({
            data: {
              user_id: data.user_id,
              type: 'nuban',
              account_number: data.account_number,
              bank_code: data.bank_code,
              recipient_code: response.data.data.recipient_code,
              bank_name: response.data.data.details.bank_name,
              currency: 'NGN',
              created_at: new Date().toISOString(),
            },
          });

          return newTransferRecipient;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransferRecepients = async () => {
    try {
      const transferRecipients = await prisma.transfer_recipient.findMany({});
      return transferRecipients;
    } catch (error) {
      logger.error(error);
    }
  };

  const getSingleRecepient = async (user_id: string) => {
    try {
      const transferRecipient = await prisma.transfer_recipient.findUnique({
        where: {
          user_id,
        },
      });
      return transferRecipient;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    verifyAccountNumber,
    addTransferRecepient,
    getTransferRecepients,
    checkTransferRecepient,
    getSingleRecepient,
  };
};

export default transferRecepientService;
