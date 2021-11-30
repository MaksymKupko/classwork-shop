import { Response } from "express";
import { ChatEntity } from "../../db/entities/chat.entity";
import { MessageEntity } from "../../db/entities/message.entity";
import { IEntityRequest } from "../../tools/types";
import { HttpError } from "../../tools/wrapper.helpers";

export const postMessage = async (req: IEntityRequest<ChatEntity>, res: Response) => {
  const chat = req.entity;
  const user = req.user;

  const chatMembers = await chat.members;

  const userExistsInChat = chatMembers.findIndex(member => member.userId === user.id);
  if (!userExistsInChat) {
    throw new HttpError("You are not a chat member and not allowed to post a message.");
  }

  const message = new MessageEntity();
  message.data = req.body.data;
  message.senderId = user.id;
  message.chatId = chat.id;
  await message.save();

  res.status(200).send(message);
};
