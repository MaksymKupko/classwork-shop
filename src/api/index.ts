import { Express, json, Request, Response } from "express";
import authRouter from "./auth/index";
import { HttpError } from "../tools/wrapper.helpers";
import { authMiddleware } from "./auth/auth.middleware";
import { IRequest } from "../tools/types";
import itemsRouter from "./items/index";
import purchasesRouter from "./purchases/index";
import { omit } from "lodash";
import accountsRouter from "./accounts/index";

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use("/auth", authRouter);
  app.use("/", authMiddleware);
  app.use("/items", itemsRouter);
  app.use("/purchases", purchasesRouter);
  app.use("/whoami", (req: IRequest, res: Response) => {
    return res.send(req.user);
  });
  app.use("/accounts", accountsRouter);

  app.use("/", (err: HttpError, req: Request, res: Response, next: Function) => {
    res.status(err?.statusCode || 400).send(err?.message || omit(err, "statusCode"));
  });
};
