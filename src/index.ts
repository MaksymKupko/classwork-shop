import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { registerRouters } from "./api";
import { EnvConfig } from "./config";
import { registerSockets } from "./web-sockets";
const app = express();

createConnection().then(() => {
  registerRouters(app);
  const server = registerSockets(app);

  server.listen(EnvConfig.PORT, () => console.log(`Started on port ${EnvConfig.PORT}`));
  console.log("Connected to DB!");
});
