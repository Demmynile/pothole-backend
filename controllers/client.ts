import { NextFunction, Response, Request, response } from "express";
import { Client, ClientLoginInput } from "../dto";
import { client } from "../models/client";
import {
  findClient,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
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

  // email verification
  const user = await findClient("", email);

  if (!user) {
    const createUser = await client.create({
      first_name,
      last_name,
      phone,
      email,
      password: userPassword,
      salt: salt,
    });

    if (createUser) {
      return response.status(200).json({ message: createUser });
    } else {
      return response.status(400).json({ error: "User not created" });
    }
  }

  return response.status(400).json({ error: "email already exists" });
};

export const ClientLogin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = <ClientLoginInput>request.body;

  // validate my email
  const existingUser = await findClient("", email);

  if (existingUser !== null) {
    const validatePassword = await ValidatePassword(
      password,
      existingUser.password,
      existingUser.salt
    );

    if (validatePassword) {
      const signature = GenerateSignature({
        _id: existingUser.id,
        first_name: existingUser.first_name,
        email: existingUser.email,
      });

      return response.json(signature);
    } else {
      return response.json({ message: "Password is not valid" });
    }
  }
  return response.status(400).json({ message: "Login credential so wrong" });
};
