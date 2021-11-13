import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { createConfig } from "./config";

createConfig();

const port = process.env.PORT || 3030;

const app = express();

app.get("/", async (req: Request, res: Response) => {
  res.send(`Im alive! ${port}`);
});

registerRouters(app);

createConnection().then(() => app.listen(port, () => console.log("Server is working !!!")));
