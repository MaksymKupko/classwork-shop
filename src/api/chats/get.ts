import { Response } from "express";
import { ChatEntity } from "../../db/entities/chat.entity";
import { IEntityRequest, IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const getChats = wrapper(async (req: IRequest, res: Response) => {
  const chats = await req.user.chatMember;

  res.status(200).send(chats);
});

export const getMessages = wrapper(async (req: IEntityRequest<ChatEntity>, res: Response) => {
  const user = req.user;
  const chat = req.entity;
  const chatMembers = await chat.members;

  const userExistsInChat = chatMembers.findIndex(member => member.userId === user.id);
  if (!userExistsInChat) {
    throw new HttpError("You are not a chat member and not allowed to get it's messages.");
  }

  const messages = await chat.messages;

  res.status(200).send(messages);
});
