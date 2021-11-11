import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { createConfig } from "./config";

createConfig();

const port = process.env.APP_PORT || 3030;

const app = express();

app.get("/", async (req: Request, res: Response) => {
  console.log(req.url);

  res.send("Im alive!");
});

registerRouters(app);

// createConnection().then(() => app.listen(port, () => console.log("Server is working !!!")));
app.listen(port, () => console.log("Server is working !!!"));
