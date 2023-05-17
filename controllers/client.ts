import { NextFunction, Response, Request, response } from "express";
import { Client, ClientLoginInput } from "../dto";
import { client } from "../models/client";
import bcrypt from "bcrypt";

export const ClientRegister = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { first_name, last_name, phone, email, password } = <Client>(
    request.body
  );

  const saltRounds = 13;
  const salt = await bcrypt.genSalt(saltRounds);

  const createUser = await client.create({
    first_name,
    last_name,
    phone,
    email,
    password: salt,
  });

  return response.json({ message: createUser });
};

export const ClientLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = <ClientLoginInput>request.body;
};
