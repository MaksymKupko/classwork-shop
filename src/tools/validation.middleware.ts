import { validateOrReject, validate } from "class-validator";
import { Response } from "express";
import { assign } from "lodash";
import { BaseEntity } from "typeorm";
import { IRequest } from "./types";
import { HttpValidationError, wrapper } from "./wrapper.helpers";
import { BaseRequest } from "../api/common/base.request";

export const validationMiddleware = <T extends typeof BaseRequest>(entity: T, target: "body" | "params" = "body") =>
  wrapper(async (req: IRequest, res: Response, next) => {
    const validationData: T = req[target];
    // const validationData = req.body as unknown as T;
    // TODO Ask Anton about the difference above
    const newEntity = new entity(validationData);

    await validateOrReject(newEntity, { validationError: { target: false } }).catch(errs => {
      throw new HttpValidationError(errs);
    });

    next();
  });
