import express, { Request, Response } from 'express';
import * as _ from 'lodash';

import { container } from '../../loaders/serviceContainer';
import { userValidation } from '../../validation';
import { errorEnvelope, errorMessage, responseEnvelope } from '../../constants';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const validation = userValidation(req.body);
  if (validation.error)
    return res
      .status(400)
      .send(errorEnvelope.invalidRequest(validation.error.details));

  const existingUser = await container.userService.checkIfUserExists(
    req.body.email
  );
  if (existingUser)
    return res
      .status(400)
      .send(
        errorEnvelope.genericError(errorMessage.userAlreadyRegistered, 400)
      );

  const newUser = await container.userService.createUser(req.body);
  res
    .status(201)
    .send(
      responseEnvelope.single(
        _.pick(newUser, [
          'id',
          'first_name',
          'last_name',
          'gender',
          'email',
          'phone_number',
        ])
      )
    );
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await container.userService.getUserById(req.params.id);
  if (!user)
    return res
      .status(400)
      .send(errorEnvelope.genericError(errorMessage.userDoesNotExist, 400));

  res.send(responseEnvelope.single(user));
});

export default router;
