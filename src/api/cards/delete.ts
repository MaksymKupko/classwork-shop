import { Request, Response } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const deleteCards = wrapper(async (req: IRequest, res: Response) => {
  const userId = req.user.id;
  const number = req.params.number;
  const card = await CardEntity.findOne({ where: { number, userId } });

  if (!card) {
    throw new HttpError("You don't have such a card");
  }

  await card.softRemove();

  return res.sendStatus(200);
});
