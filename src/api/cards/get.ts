import { Response } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { IEntityRequest, IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const getCards = wrapper(async (req: IRequest, res: Response) => {
  const user = req.user;
  const cards = await user.cards;

  return res.status(200).send(cards);
});

export const getOneCard = wrapper(async (req: IEntityRequest<CardEntity>, res: Response) => {
  const userId = req.user.id;
  const card = req.entity;

  if (card.userId !== userId) {
    throw new HttpError("This user does't have this card");
  }

  return res.status(200).send(card);
});
