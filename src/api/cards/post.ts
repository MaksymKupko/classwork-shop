import { Response } from "express";
import { assign, pick } from "lodash";
import { CardEntity } from "../../db/entities/card.entity";
import CardsService from "../../services/cards.service";
import { IRequest, TCardTransactionParams } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const postCards = wrapper(async (req: IRequest, res: Response) => {
  const data: TCardTransactionParams = pick(req.body, "number", "expired", "cvv");

  if (await CardEntity.findOne({ where: { number: data.number } })) {
    throw new HttpError("This card had been already added");
  }

  const cardsService = new CardsService();
  const card = await cardsService.getCard(data);

  const entity = new CardEntity();
  assign(entity, card);
  entity.userId = req.user.id;
  await entity.save();

  res.status(201).send(entity);
});
