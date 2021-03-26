import bcrypt from 'bcrypt';
import { IUser, IUserService } from '../interfaces';

const userService = ({ prisma, logger }: IUserService) => {
  const hashValue = async (value: string) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedValue = await bcrypt.hash(value, salt);
      return hashedValue;
    } catch (error) {
      logger.error(error);
    }
  };

  const validatePassword = async (givenPassword: string, userPassword: string) => {
    try {
      const validPassword = await bcrypt.compare(givenPassword, userPassword);
      if (!validPassword) return false;
      return true;
    } catch (error) {
      logger.error(error);
    }
  };

  const createUser = async (user: IUser) => {
    const { first_name, last_name, phone_number, email, gender, bvn, user_type, password, pin } = user;

    const safePassword = (await hashValue(password))?.toString();
    const safePin = (await hashValue(pin))?.toString();

    try {
      const user = prisma.users.create({
        data: {
          first_name,
          last_name,
          phone_number,
          email,
          password: safePassword,
          pin: safePin,
          gender,
          bvn,
          user_type,
          created_at: new Date().toISOString(),
        },
      });

      return user;
    } catch (error) {
      logger.error(error);
    }
  };

  const checkIfUserExists = async (user_email: string) => {
    try {
      const foundUser = await prisma.users.findUnique({
        where: {
          email: user_email,
        },
      });

      if (!foundUser) return false;
      return true;
    } catch (error) {
      logger.error(error);
    }
  };

  const findUserByEmail = async (user_email: string) => {
    try {
      const user = prisma.users.findUnique({
        where: {
          email: user_email,
        },
      });
      return user;
    } catch (error) {
      logger.error(error);
    }
  };

  const getUserById = async (user_id: string) => {
    try {
      const user = prisma.users.findUnique({
        where: {
          id: user_id,
        },
      });
      if (user) return user;
    } catch (error) {
      logger.error(error);
    }
  };

  return {
    hashValue,
    validatePassword,
    createUser,
    checkIfUserExists,
    findUserByEmail,
    getUserById,
  };
};

export default userService;
