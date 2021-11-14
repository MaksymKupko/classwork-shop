import { Express, json, Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import { IRequest } from "../tools/types";
import { HttpError, HttpValidationError } from "../tools/wrapper.helpers";
import accountsRouter from "./accounts/index";
import { authMiddleware } from "./auth/auth.middleware";
import authRouter from "./auth/index";
import cardsRouter from "./cards/index";
import depositsRouter from "./deposits/index";
import itemsRouter from "./items/index";
import purchasesRouter from "./purchases/index";
import withdrawalsRouter from "./withdrawals/index";

export const registerRouters = (app: Express) => {
  app.use(json());
  app.use("/auth", authRouter);

  const filePath = path.join(__dirname, "../db/files/");
  app.use(fileUpload());

  app.post("/upload", async (req, res) => {
    const file = req.files.test as UploadedFile;
    console.log(file);
    await file.mv(filePath + file.name);
    return res.send("Success");
    // return res.download(filesPath + '1.jpg');
  });

  app.get("/download/:name", async (req, res) => {
    const file = `${filePath}${req.params.name}`;

    res.download(file);
  });

  app.use("/", authMiddleware);
  app.use("/items", itemsRouter);
  app.use("/purchases", purchasesRouter);
  app.use("/whoami", (req: IRequest, res: Response) => {
    return res.send(req.user);
  });
  app.use("/accounts", accountsRouter);
  app.use("/cards", cardsRouter);
  app.use("/deposits", depositsRouter);
  app.use("/withdrawals", withdrawalsRouter);

  app.use("/", (err: HttpError, req: Request, res: Response, next: Function) => {
    if (err instanceof HttpValidationError) {
      return res.status(err?.statusCode || 400).json(err.errors);
    }
    return res.status(err?.statusCode || 400).send(err?.message);
  });
};
