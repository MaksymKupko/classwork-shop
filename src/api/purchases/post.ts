import { Response } from "express";
import { ChatMemberEntity } from "../../db/entities/chat-member.entity";
import { ChatEntity } from "../../db/entities/chat.entity";
import { ItemEntity } from "../../db/entities/item.entity";
import { PurchaseEntity } from "../../db/entities/purchase.entity";
import { IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const postPurchases = wrapper(async (req: IRequest, res: Response) => {
  const { itemId, count } = req.body;
  const customer = req.user;
  const item: ItemEntity = await ItemEntity.findOne(itemId);

  if (!item) {
    throw new HttpError(`There is now item with id ${itemId}`);
  }

  if (item.quantity < count) {
    throw new HttpError(`There is not enough quntity of item. There are only ${item.quantity} avaliable.`);
  }
  const sellerId = item.sellerId;

  item.quantity -= count;
  await item.save();
  const purchase = new PurchaseEntity();
  purchase.quantity = count;
  purchase.customerId = customer.id;
  purchase.itemId = itemId;

  await purchase.save();

  const customerChats = await Promise.all((await customer.chatMember).map(chatMember => chatMember.chat));
  const customerChatsMembers = await Promise.all(customerChats.map(chat => chat.members));
  const chatWithSellerExists =
    customerChatsMembers.filter(
      singleChatMembers =>
        singleChatMembers.length === 2 && singleChatMembers.findIndex(member => member.userId === sellerId) >= 0
    ).length > 0;

  if (!chatWithSellerExists) {
    const chat = new ChatEntity();
    await chat.save();
    const chatMember1 = new ChatMemberEntity();
    chatMember1.userId = customer.id;
    chatMember1.chatId = chat.id;
    await chatMember1.save();

    const chatMember2 = new ChatMemberEntity();
    chatMember2.userId = sellerId;
    chatMember2.chatId = chat.id;
    await chatMember2.save();
    return res
      .status(200)
      .send(`Purchase with id ${purchase.id} was successfully created. New chat with id ${chat.id} was also created`);
  }
  return res.status(200).send(`Purchase with id ${purchase.id} was successfully created.`);
});
