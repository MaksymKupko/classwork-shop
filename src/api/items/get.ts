import { Response } from "express";
import { ItemEntity } from "../../db/entities/item.entity";
import { IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const getItems = wrapper(async (req: IRequest, res: Response) => {
  // const items = await req.user.items;
  const items = await ItemEntity.find();
  return res.status(200).send(items);
});
