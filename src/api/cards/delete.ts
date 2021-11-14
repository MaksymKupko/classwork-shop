import { Response } from "express";
import { CardEntity } from "../../db/entities/card.entity";
import { IEntityRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const deleteCards = wrapper(async (req: IEntityRequest<CardEntity>, res: Response) => {
  const userId = req.user.id;
  const card = req.entity;

  if (card.userId !== userId) {
    throw new HttpError("You don't have such a card");
  }

  await card.remove();

  return res.sendStatus(200);
});
