import axios from 'axios';

import config from '../config';
import { logger } from '../loaders';

const userFunctions = () => {
  const getUser = async (user_id: string) => {
    try {
      const user = await axios.get(config.goloanUserService + `/${user_id}`);
      return user.data.data;
    } catch (error) {
      logger.error(error);
    }
  };
  return {
    getUser,
  };
};

const userFunction = userFunctions();

export default userFunction;
