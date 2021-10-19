import express, { Request, Response } from "express";
import { config } from "dotenv";
import { registerRouters } from "./api";
import { read } from "./data/mocks";

config();

const port = process.env.APP_PORT || 3030;

const app = express();
registerRouters(app);

app.get("/", async (req: Request, res: Response) => {
  console.log(req.url);

  res.send("Im alive!");
});

read().then(() => app.listen(port, () => console.log(`Started on port ${port}`)));
