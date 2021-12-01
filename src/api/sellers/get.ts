import { Response } from "express";
import { ItemEntity } from "../../db/entities/item.entity";
import { IEntityRequest, IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const getItems = wrapper(async (req: IRequest, res: Response) => {
  const items = await req.user.items;
  return res.status(200).send(items);
});

export const getItemById = wrapper(async (req: IEntityRequest<ItemEntity>, res: Response) => {
  const item = req.entity;
  const user = req.user;

  if (item.sellerId !== user.id) {
    throw new HttpError("Permission denied");
  }

  res.status(200).send(item);
});
