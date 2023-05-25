import express from "express";
import { ClientLogin, ClientRegister } from "../controllers/client";

const route = express.Router();

route.post("/register", ClientRegister);
route.post("/login", ClientLogin);

export { route as clientRoute };
