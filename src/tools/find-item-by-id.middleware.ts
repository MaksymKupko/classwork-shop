import { Response } from "express";
import { BaseEntity } from "typeorm";
import { IEntityRequest } from "./types";
import { HttpError, wrapper } from "./wrapper.helpers";

export const findItemByIdMiddleware = <T extends typeof BaseEntity>(entity: T) =>
  wrapper(async (req: IEntityRequest<BaseEntity>, res: Response, next) => {
    const id = req.params.id;
    const item = await entity.findOne(id);

    if (!item) {
      throw new HttpError(`There is now item with id ${id}`);
      //TODO wrapperMiddleware
      // return res.status(404).send(`There is no item with id ${id}`);
    }

    req.entity = item;

    return next();
  });
