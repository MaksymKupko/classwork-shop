import express, { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { registerRouters } from "./api";
import { EnvConfig } from "./config";

const app = express();

app.get("/", async (req: Request, res: Response) => {
  // res.send(`Im alive! ${port}`);
  res.redirect("/api/docs");
});

registerRouters(app);

createConnection().then(() => {
  app.listen(EnvConfig.PORT, () => console.log(`Started on port ${EnvConfig.PORT}`));
  console.log("Connected to DB!");
});
