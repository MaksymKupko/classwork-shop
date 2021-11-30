import { Router } from "express";
import { ChatEntity } from "../../db/entities/chat.entity";
import { MessageEntity } from "../../db/entities/message.entity";
import { findItemByIdMiddleware } from "../../tools/find-item-by-id.middleware";
import { validationMiddleware } from "../../tools/validation.middleware";
import { deleteMessage } from "./delete";
import { getChats, getMessages } from "./get";
import { postMessage } from "./post";
import { PostMessageRequest } from "./requests/post-message.request";

const router = Router();

router.get("/", getChats);
router.get("/chats/:id/messages", findItemByIdMiddleware(ChatEntity), getMessages);
router.post(
  "/chats/:id/messages",
  validationMiddleware(PostMessageRequest),
  findItemByIdMiddleware(ChatEntity),
  postMessage
);
router.delete("/:id", findItemByIdMiddleware(MessageEntity), deleteMessage);

export default router;
