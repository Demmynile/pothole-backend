import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

export default async () => {
  // initialize the dotenv file
  dotenv.config();

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.log(err);
  }
};
