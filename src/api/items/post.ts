import { Request, Response } from "express";
import { ITEMS, save } from "../../data/mocks";
import { pick } from "lodash";
import { ItemEntity } from "../../entities/item.entity";

export const postItem = async (req: Request, res: Response) => {
  const partialItem: Partial<ItemEntity> = pick(req.body, "sellerId", "title", "price", "quantity");

  const id = Math.max(...ITEMS.map(i => i.id)) + 1;
  ITEMS.push(new ItemEntity({ ...partialItem, id }));

  await save();
  res.send("olololo");
};
