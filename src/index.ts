import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { createConnection } from "typeorm";

config();

const port = process.env.APP_PORT || 3030;

const app = express();
registerRouters(app);

app.get("/", async (req: Request, res: Response) => {
  console.log(req.url);

  res.send("Im alive!");
});

createConnection().then(() => app.listen(port, () => console.log("Ololo")));
