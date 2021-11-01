import { Response } from "express";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { IEntityRequest, IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const getPurchases = wrapper(async (req: IRequest, res: Response) => {
  const userId = req.user.id;

  const purchases = await PurchaseEntity.find({
    where: {
      customerId: userId,
    },
  });
  ``;
  res.status(200).send(purchases);
});

export const getPurchaseById = wrapper(async (req: IEntityRequest<PurchaseEntity>, res: Response) => {
  if (req.user.id !== req.entity.customerId) {
    throw new HttpError("You don't have permissions to read this purchase");
  }

  return res.status(200).send(req.entity);
});
