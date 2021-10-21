import { Express, json } from "express";
import itemRouter from "./items";
import usersRouter from "./users/index;

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use("/items", itemRouter);
  app.use("/users", usersRouter);
};
