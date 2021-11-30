import { Response } from "express";
import { MessageEntity } from "../../db/entities/message.entity";
import { IEntityRequest } from "../../tools/types";
import { HttpError } from "../../tools/wrapper.helpers";

export const deleteMessage = async (req: IEntityRequest<MessageEntity>, res: Response) => {
  const message = req.entity;
  const user = req.user;

  if (message.senderId !== user.id) {
    throw new HttpError("You don't have a permission to delete this message");
  }

  await message.remove();
  res.sendStatus(200);
};
