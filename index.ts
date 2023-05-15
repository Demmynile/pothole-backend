import express from "express";
import dbConnection from "./services/Database";
import App from "./services/ExpressServer";

const startServer = async () => {
  const app = express();

  await dbConnection();

  await App(app);

  app.listen(5000, () => {
    console.log("server started");
  });
};

startServer();
