import { Response } from "express";
import { assign, pick } from "lodash";
import { ItemEntity } from "../../db/entities/item.entity";
import { IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const postItems = wrapper(async (req: IRequest, res: Response) => {
  const user = req.user;
  const item = new ItemEntity();
  assign(item, pick(req.body, "price", "quantity", "title"));
  item.sellerId = user.id;
  await item.save();
  res.status(201).send(item);
});
