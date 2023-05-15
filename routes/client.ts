import express from "express";
import { ClientRegister } from "../controllers/client";

const route = express.Router();

route.post("/register", ClientRegister);

export { route as clientRoute };
