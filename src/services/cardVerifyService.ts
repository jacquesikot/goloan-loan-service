import axios from 'axios';
import config from '../config';
import { ICardInit, IServiceInterface } from '../interfaces';

// TODO: Refactor this service
const cardVerifyService = ({ logger, prisma, agenda }: IServiceInterface) => {
  const options = {
    headers: {
      Authorization: config.paystackApiKey,
      'Content-Type': 'application/json',
    },
  };

  const initiateCardVerification = async (user_id: string) => {
    try {
      const foundVerification = await prisma.card_verification.findUnique({
        where: {
          user_id,
        },
      });

      if (foundVerification) {
        const user = await axios.get(config.goloanUserService + `/${user_id}`);

        const userData = user.data.data;

        const data: ICardInit = {
          email: userData.email,
          amount: '5000',
        };

        const response = await axios.post(
          config.paystackUrls.initializeTransaction,
          data,
          options,
        );

        const paystackResponse = response.data.data;

        const modifiedValue = () => {
          if (foundVerification.modified !== null) {
            const value = Number(foundVerification.modified) + 1;
            return value.toString();
          } else return '1';
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

        await agenda.schedule(
          'in 3 second',
          [config.agendaJobs.refundInitAmount],
          {
            user_id,
          },
        );

        return {
          authorization_url: paystackResponse.authorization_url,
        };
      } else {
        const user = await axios.get(config.goloanUserService + `/${user_id}`);

        const userData = user.data.data;

        const data: ICardInit = {
          email: userData.email,
          amount: config.initChargeAmount,
        };

        const response = await axios.post(
          config.paystackUrls.initializeTransaction,
          data,
          options,
        );

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

        await agenda.schedule(
          'in 3 second',
          [config.agendaJobs.refundInitAmount],
          {
            user_id,
          },
        );

        return {
          authorization_url: paystackResponse.authorization_url,
        };
      }
    } catch (error) {
      logger.info(error);
    }
  };

  const getVerifications = async () => {
    try {
      const verifications = await prisma.card_verification.findMany({});
      return verifications;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    initiateCardVerification,
    getVerifications,
  };
};

export default cardVerifyService;
