import { Express, json } from "express";
import itemRouter from "./items";

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use("/items", itemRouter);
};
