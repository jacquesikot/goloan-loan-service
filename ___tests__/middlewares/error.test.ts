// import { Request, Response } from 'express';

import { error } from '../../src/middlewares';
import { errorEnvelope, errorMessage } from '../../src/constants';

describe('error middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNextFunction = jest.fn();

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  const testError = new Error();

  test('should return status 500 and error message if error given', () => {
    error(testError, mockRequest, mockResponse, mockNextFunction);

    expect(mockResponse.json).toBeCalledWith(
      errorEnvelope.genericError(errorMessage.internalServerError, 500)
    );
  });
});
