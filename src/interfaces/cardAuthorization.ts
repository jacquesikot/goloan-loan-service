interface ICardAuthorization {
  user_id: string;
  authorization_code: string;
  card_type: string;
  last4: string;
  channel: string;
  signature: string;
  reusable: boolean;
  country_code: string;
  account_name: string;
  exp_month: string;
  exp_year: string;
  bin: string;
  bank: string;
}

export default ICardAuthorization;
