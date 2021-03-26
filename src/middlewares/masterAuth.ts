import { Request, Response, NextFunction } from 'express';

import { errorEnvelope, errorMessage, httpHeaders } from '../constants';
import config from '../config';

const masterAuth = (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers[httpHeaders.masterKey];

  if (!key) {
    const code = 401;
    res.status(code);
    res.json(errorEnvelope.genericError(errorMessage.noMasterKey, code));
    return;
  }

  if (key === config.masterKey) {
    return next();
  } else {
    const code = 400;
    res.status(code);
    res.json(errorEnvelope.genericError(errorMessage.invalidMasterKey, code));
    return;
  }
};

export default masterAuth;
