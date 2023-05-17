export interface Client {
  first_name: string;
  last_name: string;
  phone: string;
  pincode?: string;
  email: string;
  password: string;
  address?: string;
}

export interface ClientLoginInput {
  email: string;
  password: string;
}

export interface clientPayload {
  _id: string;
  first_name: string;
  email: string;
}
