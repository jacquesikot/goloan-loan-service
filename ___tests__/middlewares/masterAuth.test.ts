import { Request, Response } from 'express';

import { masterAuth } from '../../src/middlewares';
import { errorMessage } from '../../src/constants';
import config from '../../src/config';

describe('masterAuth', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction = jest.fn();

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  test('should return status 400 and error if no key', async () => {
    mockRequest = {
      headers: {},
    };

    masterAuth(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.json).toBeCalledWith({
      message: errorMessage.noMasterKey,
      code: 401,
    });
  });

  test('should return 400 and error if key is invalid', () => {
    mockRequest = {
      headers: {
        'x-master-key': 'jimmy',
      },
    };

    masterAuth(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.json).toBeCalledWith({
      message: errorMessage.invalidMasterKey,
      code: 400,
    });
  });

  test('should call next function if key is provided and correct', () => {
    mockRequest = {
      headers: {
        'x-master-key': config.masterKey,
      },
    };

    masterAuth(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toBeCalledTimes(1);
  });
});
