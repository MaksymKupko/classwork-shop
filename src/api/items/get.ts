import { Response } from "express";
import { IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const getItems = wrapper(async (req: IRequest, res: Response) => {
  const items = await req.user.items;
  return res.send(items);
});
