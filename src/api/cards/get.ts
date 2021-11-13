import { Response } from "express";
import { IRequest } from "../../tools/types";

export const getCards = async (req: IRequest, res: Response) => {
  const user = req.user;
  const cards = await user.cards;

  return res.status(200).send(cards);
};
