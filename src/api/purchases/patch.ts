import { Response } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { PurchaseStatusEnum } from "../../enums/purchase-status.enum";
import { IEntityRequest } from "../../tools/types";
import { HttpError, middlewareWrapper, wrapper } from "../../tools/wrapper.helpers";

export const patchPurchases = middlewareWrapper(async (req: IEntityRequest<PurchaseEntity>, res: Response) => {
  const purchase = req.entity;
  const newStatus: PurchaseStatusEnum = req.body.status;

  if (purchase.customerId !== req.user.id) {
    throw new HttpError(`You are not allowed to read or change this purchase`, 401);
  }
  if (!newStatus) {
    throw new HttpError(`You didn't send new status of purchase`);
  }

  purchase.status = newStatus;
  await purchase.save();

  return res.status(200).send(`Purchase status was successfully updated`);
});
