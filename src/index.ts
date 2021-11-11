import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { createConnection, getConnectionOptions } from "typeorm";
import "reflect-metadata";
import { createConfig } from "./config";

createConfig();

const port = process.env.PORT || 3030;

const app = express();

app.get("/", async (req: Request, res: Response) => {
  console.log(req.url);

  res.send(`Im alive! ${port}`);
});

registerRouters(app);

(async function () {
  const connectionOptions = await getConnectionOptions();
  // Object.assign(connectionOptions, {
  //   ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  // });
  createConnection(connectionOptions).then(() => app.listen(port, () => console.log("Server is working !!!")));
})();
// app.listen(port, () => console.log("Server is working !!!"));
