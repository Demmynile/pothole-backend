import { client } from "../models/client";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { clientPayload } from "../dto";

export const findClient = async (id?: string | undefined, email?: string) => {
  if (email) {
    const vendor = await client.findOne({ email: email });
    return vendor;
  } else {
    const vendor = await client.findById(id);
    return vendor;
  }
};

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (salt: string, password: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  saltPassword: string,
  enteredPassword: string,
  savedPassword: string
) => {
  return (
    (await GeneratePassword(enteredPassword, saltPassword)) == savedPassword
  );
};

export const GenerateSignature = async (payload: clientPayload) => {
  const signature = jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
  return signature;
};

export const ValidateSignature = async (req: any) => {
  const signature = req.get("authorization");

  if (signature) {
    const payload = (await jwt.verify(
      signature.split(" ")[1],
      APP_SECRET
    )) as clientPayload;

    req.user = payload;

    return true;
  }
  return false;
};
