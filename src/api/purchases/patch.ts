import { Response } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { PurchaseStatusEnum } from "../../enums/purchase-status.enum";
import { IEntityRequest } from "../../tools/types";
import { HttpError, middlewareWrapper, wrapper } from "../../tools/wrapper.helpers";

export const patchPurchases = wrapper(async (req: IEntityRequest<PurchaseEntity>, res: Response) => {
  const { status } = req.body;

  const purchase = req.entity;

  if (purchase.customerId !== req.user.id) {
    throw new HttpError("Go fuck yourself");
  }

  if (purchase.status === PurchaseStatusEnum.CANCELLED) {
    throw new HttpError("Cannot change status of cancelled order. Please create new.");
  }

  if (status === PurchaseStatusEnum.CANCELLED) {
    const item = await purchase.item;
    item.quantity += purchase.quantity;
    await item.save();
  }

  purchase.status = status;
  await purchase.save();

  return res.status(200).send(`Purchase #${purchase.id} status has been changed to ${status}`);
});
