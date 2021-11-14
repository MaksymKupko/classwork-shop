import { Response } from "express";
import { pick } from "lodash";
import { CardEntity } from "../../db/entities/card.entity";
import CardsService from "../../services/cards.service";
import { IEntityRequest, TCardTransactionParams } from "../../tools/types";
import { HttpError } from "../../tools/wrapper.helpers";

export const patchDeposits = async (req: IEntityRequest<CardEntity>, res: Response) => {
  const { entity: cardEntity, user, body } = req;
  const sum: number = body.sum;
  if (user.id !== cardEntity.userId) {
    throw new HttpError("Permission denied");
  }

  const cardParams: TCardTransactionParams = pick(cardEntity, "number", "cvv", "expired");
  const cardService = new CardsService();
  const cardInfo = await cardService.getCard(cardParams);

  if (cardInfo.balance < sum) {
    throw new HttpError("You don't have enough money on your card");
  }

  await cardService.withdrawFromCard(cardParams, sum);
  user.balance = user.balance + sum;
  await user.save();

  return res.status(200).send({ balance: user.balance });
};
