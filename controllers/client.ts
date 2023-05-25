import { NextFunction, Response, Request, response } from "express";
import { Client, ClientLoginInput } from "../dto";
import { client } from "../models/client";
import {
  findClient,
  GeneratePassword,
  GenerateSalt,
  ValidatePassword,
} from "../utils/helpers";

export const ClientRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { first_name, last_name, phone, email, password } = <Client>(
    request.body
  );

  // generate salt
  const salt = await GenerateSalt();

  // hash password
  const userPassword = await GeneratePassword(password, salt);

  const createUser = await client.create({
    first_name,
    last_name,
    phone,
    email,
    password: userPassword,
    salt: salt,
  });

  return response.json({ message: createUser });
};

export const ClientLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = <ClientLoginInput>request.body;

  // validate my email
  const existingUser = await findClient("", email);
};
