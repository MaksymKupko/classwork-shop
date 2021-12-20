import { config } from "dotenv";
import { keys } from "lodash";

export enum EnvEnum {
  PORT = "PORT",
  SECRET_KEY = "SECRET_KEY",
  NODE_ENV = "NODE_ENV",
  TYPEORM_URL = "TYPEORM_URL",
  DATABASE_URL = "DATABASE_URL",
  HEROKU_URL = "HEROKU_URL",
  CARDS_SERVICE_URL = "CARDS_SERVICE_URL",
}
type TEnvConfig = Record<keyof typeof EnvEnum, any>;
export let EnvConfig = null as unknown as TEnvConfig;

const initEnv = () => {
  config();
  const env = keys(EnvEnum).reduce((acc, k) => ({ ...acc, [k]: process.env[k] }), {});

  return env as Record<keyof typeof EnvEnum, any>;
};

if (!EnvConfig) {
  EnvConfig = initEnv();
}
