import { Response } from "express";
import { ItemEntity } from "../../db/entities/item.entity";
import { IEntityRequest, IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const getItems = wrapper(async (req: IRequest, res: Response) => {
  // const items = await req.user.items;
  const items = await ItemEntity.find();
  return res.status(200).send(items);
});

export const getItemById = wrapper(async (req: IEntityRequest<ItemEntity>, res: Response) => {
  const item = req.entity;

  res.status(200).send(item);
});
