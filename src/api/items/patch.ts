import { Response } from "express";
import { IRequest } from "../../tools/types";
import { wrapper } from "../../tools/wrapper.helpers";

export const patchItems = wrapper(async (req: IRequest, res: Response) => {
  const id = req.params.id;
});
