import { Response } from "express";
import { assign, pick } from "lodash";
import { CardEntity } from "../../db/entities/card.entity";
import { IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const postCards = wrapper(async (req: IRequest, res: Response) => {
  const data = pick(req.body, "number", "expired", "cvv");
  const card = new CardEntity();
  assign(card, data);
  // await card.save();

  res.sendStatus(200);
});
