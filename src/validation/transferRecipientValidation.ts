import * as Joi from 'joi';

import { ITransferRecipient } from '../interfaces';

const validateTransferRecipient = (transferRecipient: ITransferRecipient) => {
  const schema = Joi.object({
    user_id: Joi.string().min(10).required(),
    account_number: Joi.string().min(10).max(10),
    bank_code: Joi.string().min(3).max(3),
  });

  return schema.validate(transferRecipient);
};

export default validateTransferRecipient;
