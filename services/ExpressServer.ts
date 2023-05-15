import { Application } from "express";
import bodyParser from "body-parser";
import { clientRoute } from "../routes/client";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/client", clientRoute);

  return app;
};
