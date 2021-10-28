import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { createConfig } from "./config";

createConfig();

const port = process.env.APP_PORT || 3030;

const app = express();
registerRouters(app);

app.get("/", async (req: Request, res: Response) => {
  console.log(req.url);

  res.send("Im alive!");
});

createConnection().then(() => app.listen(port, () => console.log("Ololo")));
