/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';

const errorMessage = {
  noDatabaseConnection: 'Could not connect to the database',
  internalServerError: 'Oops, something went wrong. Internal Server Error',
  invalidMasterKey: 'Invalid master key',
  noMasterKey: 'No master key provided',
  noTransferRecepient: 'Sorry, user does not have a bank account set',
  transferRecepientExists: 'User already has account set',
  wrongAccountDetails: 'Account details provided are not correct',
  userDoesNotExist: 'User given does not exist',
};

const errorEnvelope = {
  invalidRequest: (error: Joi.ValidationError) => {
    return {
      message: error.details[0].message,
      field: error.details[0].context.label,
      type: error.details[0].type,
    };
  },

  genericError: (message: string, code: number) => {
    return {
      message,
      code,
    };
  },
};

export { errorMessage, errorEnvelope };
