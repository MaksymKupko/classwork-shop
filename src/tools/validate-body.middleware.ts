import { validateOrReject, validate } from "class-validator";
import { Response } from "express";
import { assign } from "lodash";
import { BaseEntity } from "typeorm";
import { IRequest } from "./types";
import { HttpValidationError, wrapper } from "./wrapper.helpers";
import { BaseRequest } from "../api/common/base.request";

export const validationMiddleware = <T extends typeof BaseRequest>(entity: T) =>
  wrapper(async (req: IRequest, res: Response, next) => {
    const body = req.body as unknown as T;
    const newEntity = new entity(body);

    assign(newEntity, body);

    await validateOrReject(newEntity).catch(errs => {
      throw new HttpValidationError(errs);
    });

    next();
  });
