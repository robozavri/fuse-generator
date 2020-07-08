export const genders = {
  male: 'male',
  female: 'female',
};

export interface User {
  _id?: string;
  email: string;
  name: string;

  joinedAt?: Date;

  role?: string;
  isBlocked?: boolean;
  isActivated?: boolean;
  guaranteeEnabled?: boolean;

  country?: string;
  languages?: string[];
  about?: string;
  driverLicense?: any;
  transmission?: boolean;
  paymentCards?: any[];
}
