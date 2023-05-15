export interface Admin {
  first_name: string;
  last_name: string;
  govtId: string;
  phone: string;
  pincode: string;
  email: string;
  password: string;
  address: string;
}

export interface AdminLoginInput {
  email: string;
  password: string;
}
