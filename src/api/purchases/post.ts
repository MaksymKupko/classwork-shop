import { Response } from "express";
import { ItemEntity } from "../../db/entities/item.entity";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const postPurchases = wrapper(async (req: IRequest, res: Response) => {
  const { itemId, count } = req.body;
  const user = req.user;
  const item = await ItemEntity.findOne(itemId);

  if (!item) {
    throw new HttpError(`There is now item with id ${itemId}`);
  }

  if (item.quantity < count) {
    throw new HttpError(`There is not enough quntity of item. There are only ${item.quantity} avaliable.`);
  }

  item.quantity -= count;
  await item.save();
  const purchase = new PurchaseEntity();
  purchase.quantity = count;
  purchase.customerId = user.id;
  purchase.itemId = itemId;

  await purchase.save();

  return res.status(200).send(`Purchase with id ${purchase.id} was successfully created.`);
});
