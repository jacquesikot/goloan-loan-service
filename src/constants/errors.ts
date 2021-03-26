/* eslint-disable @typescript-eslint/no-explicit-any */
const errorMessage = {
  noDatabaseConnection: 'Could not connect to the database',
  internalServerError: 'Oops, something went wrong. Internal Server Error',
  invalidMasterKey: 'Invalid master key',
  noMasterKey: 'No master key provided',
  userAlreadyRegistered: 'User with the given ID is already regisered',
  userDoesNotExist: 'User with given ID does not exist',
};

const errorEnvelope = {
  invalidRequest: (error: any) => {
    return {
      message: error[0].message,
      field: error[0].context.label,
      type: error[0].type,
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
