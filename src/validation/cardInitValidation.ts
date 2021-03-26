import * as Joi from 'joi';

import { ICardInit } from '../interfaces';

const validateCardInit = (user: ICardInit) => {
  const schema = Joi.object({
    user_id: Joi.string().min(10).required(),
  });

  return schema.validate(user);
};

export default validateCardInit;
