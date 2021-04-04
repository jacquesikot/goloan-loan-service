import axios from 'axios';

import { ICardAuthorization, IServiceInterface } from '../interfaces';
import { container } from '../loaders';
import config from '../config';

const transactionService = ({ prisma, logger }: IServiceInterface) => {
  const options = {
    headers: {
      Authorization: config.paystackApiKey,
      'Content-Type': 'application/json',
    },
  };

  const optionsFlutterwave = {
    headers: {
      Authorization: config.flutterwaveSecKey,
      'Content-Type': 'application/json',
    },
  };

  const transferFunds = async (
    user_id: string,
    narration: string,
    amount: string,
  ) => {
    try {
      const recepient = await container.transferRecepientService.getSingleRecepient(
        user_id,
      );
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

      const transfer = await axios.post(
        config.flutterwaveUrls.initiateTransfer,
        data,
        optionsFlutterwave,
      );
      if (
        transfer.data.status === 'success' &&
        transfer.data.message === 'Transfer Queued Successfully'
      ) {
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
    } catch (error) {
      console.log(error);
    }
  };

  const verifyTransaction = async (reference: string) => {
    try {
      const verified = await axios.get(
        config.paystackUrls.verifyTransaction + `${reference}`,
        options,
      );

      return verified;
    } catch (error) {
      console.log(error);
    }
  };

  const addAuthorization = async (cardAuth: ICardAuthorization) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const refundInitAmount = async (reference: string) => {
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

          await transferFunds(
            ref.user_id,
            'refund of card init fee',
            config.initChargeAmount,
          );

          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    refundInitAmount,
    transferFunds,
  };
};
export default transactionService;
