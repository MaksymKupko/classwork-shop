import { Response } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import CardsService from "../../services/cards.service";
import { IEntityRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const patchWithdrawals = wrapper(async (req: IEntityRequest<CardEntity>, res: Response) => {
  const user = req.user;
  const card = req.entity;
  const sum: number = req.body.sum;

  if (card.userId !== user.id) {
    throw new HttpError("Permission denied");
  }

  if (user.balance < sum) {
    throw new HttpError("User doesn't have enough money to withdraw");
  }

  const cardService = new CardsService();
  await cardService.depositToCard(card.number, sum);
  user.balance -= sum;
  await user.save();

  return res.status(200).send({ balance: user.balance });
});
