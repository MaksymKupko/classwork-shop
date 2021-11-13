import { Response } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const getCards = wrapper(async (req: IRequest, res: Response) => {
  const user = req.user;
  const cards = await user.cards;

  return res.status(200).send(cards);
});

export const getOneCard = wrapper(async (req: IRequest, res: Response) => {
  const userId = req.user.id;
  const number = req.params.number;

  const card = await CardEntity.findOne({
    where: {
      number,
      userId,
    },
  });

  if (!card) {
    throw new HttpError("This user does't have this card");
  }

  return res.status(200).send(card);
});
