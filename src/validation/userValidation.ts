import * as Joi from 'joi';

import { IUser } from '../interfaces';

const validateUser = (user: IUser) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    phone_number: Joi.string().min(13).max(21).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(12).required(),
    pin: Joi.string().min(4).max(4).required(),
    gender: Joi.string().min(4).max(6).required(),
    bvn: Joi.string().min(10).max(10).required(),
    user_type: Joi.string().min(1).max(1).required(),
  });

  return schema.validate(user);
};

export default validateUser;
