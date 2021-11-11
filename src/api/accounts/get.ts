import { Response } from "express";
import { In } from "typeorm";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { UserEntity } from "../../db/entities/user.entity";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { IEntityRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";
import { AccountResponse } from "./responses/account.response";

export const getUserAccount = wrapper(async (req: IEntityRequest<UserEntity>, res: Response) => {
  const { user, entity } = req;
  const reqId = +req.params.id;

  if (user.role === UserRoleEnum.CUSTOMER) {
    const purchases = await user.purchases;
    const items = await Promise.all(purchases.map(async purchase => await purchase.item));

    if (items.find(item => item.sellerId === reqId)) {
      return res.status(200).send(new AccountResponse(entity));
    } else {
      throw new HttpError("You don't have permissions to view this seller");
    }
  } else if (user.role === UserRoleEnum.SELLER) {
    const items = await user.items;
    const itemsIds = items.map(i => i.id);
    const sellerPurchases = await PurchaseEntity.find({ where: { itemId: In(itemsIds) } });
    const customerIds = sellerPurchases.map(purchase => purchase.customerId);

    if (customerIds.includes(reqId)) {
      return res.status(200).send(new AccountResponse(entity));
    } else {
      throw new HttpError("You don't have permissions to view this customer");
    }
  }
});
