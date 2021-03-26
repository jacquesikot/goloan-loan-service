interface IUser {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
  pin: string;
  email: string;
  corporate_id?: string;
  gender: 'male' | 'female';
  bvn: string;
  user_type: string;
}

export default IUser;
