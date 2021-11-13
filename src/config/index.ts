import { config } from "dotenv";

export const EnvConfig: any = {};

export const createConfig = () => {
  config();
  EnvConfig.PORT = process.env.PORT || 3000;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY;
  EnvConfig.CARDS_SERVICE_URL = process.env.CARDS_SERVICE_URL;
};
