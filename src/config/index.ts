import { config } from "dotenv";

export const EnvConfig: any = {};

export const createConfig = () => {
  config();
  EnvConfig.PORT = process.env.PORT || 3000;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY;
};
//
