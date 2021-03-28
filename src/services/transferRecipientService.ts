import axios from 'axios';
import config from '../config';
import { IServiceInterface, ITransferRecipient } from '../interfaces';
import { userFunctions } from '../utils';

const transferRecipientService = ({ prisma, logger }: IServiceInterface) => {
  const options = {
    headers: {
      Authorization: config.paystackApiKey,
      'Content-Type': 'application/json',
    },
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

  const addTransferRecipient = async (data: ITransferRecipient) => {
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
      logger.error(error);
    }
  };

  const getTransferRecipients = async () => {
    try {
      const transferRecipients = await prisma.transfer_recipient.findMany({});
      return transferRecipients;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    verifyAccountNumber,
    addTransferRecipient,
    getTransferRecipients,
  };
};

export default transferRecipientService;
