import { Express, json } from "express";
import authRouter from "./auth/index";
import purchasesRouter from "./purchases/index";
import pursRouter from "./purs/index";

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use("/auth", authRouter);
  app.use("/purchases", purchasesRouter)";
  app.use("/purs", pursRouter)";
};
