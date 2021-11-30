import { Express, json, Request, Response } from "express";
import { files } from "../tools/files";
import { swagger } from "../tools/swagger";
import { IRequest } from "../tools/types";
import { HttpError, HttpValidationError } from "../tools/wrapper.helpers";
import accountsRouter from "./accounts/index";
import { authMiddleware } from "./auth/auth.middleware";
import authRouter from "./auth/index";
import balanceRouter from "./balance/index";
import cardsRouter from "./cards/index";
import itemsRouter from "./items/index";
import purchasesRouter from "./purchases/index";
import chatsRouter from "./chats/index";

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use(swagger());
  app.use("/auth", authRouter);

  app.use(files());

  app.use("/", authMiddleware);
  app.use("/items", itemsRouter);
  app.use("/purchases", purchasesRouter);
  app.use("/whoami", (req: IRequest, res: Response) => {
    return res.send(req.user);
  });
  app.use("/accounts", accountsRouter);
  app.use("/cards", cardsRouter);
  app.use("/balance", balanceRouter);
  app.use("/chats", chatsRouter);

  app.use("/", (err: HttpError, req: Request, res: Response, next: Function) => {
    if (err instanceof HttpValidationError) {
      return res.status(err?.statusCode || 400).json(err.errors);
    }
    return res.status(err?.statusCode || 400).send(err?.message);
  });
};
