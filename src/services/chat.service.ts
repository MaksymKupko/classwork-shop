import { map } from 'lodash';
import { ChatMemberEntity } from '../db/entities/chat-member.entity';
import { ChatEntity } from '../db/entities/chat.entity';
import { MessageEntity } from '../db/entities/message.entity';
import { TCreateMessage, TMessageEdit } from '../tools/types';

export class ChatService {
  public static async isChatMember(chatId: number, userId: number) {
    const chat = await ChatEntity.findOne(chatId);
    if (chat) {
      const chatMembers = await chat.members;
      return chatMembers.some(member => member.userId === userId);
    }
  }

  async isMessageSender(userId: number, messageId: number) {
    const message = await MessageEntity.findOne(messageId);

    return message?.senderId === userId;
  }

  async editMessage(payload: TMessageEdit) {
    const { data, messageId } = payload;
    const message = await MessageEntity.findOne(messageId);
    if (message) {
      message.data = data;
      await message.save();

      return message;
    }
  }

  async deleteMessage(messageId: number) {
    const message = await MessageEntity.findOne(messageId);

    if (message) {
      return await message.remove();
    }
  }

  async getUsersByChatId(chatId: number) {
    const members = await ChatMemberEntity.find({ where: { chatId } });
    const users = await Promise.all(members.map(member => member.user));
    return users;
  }

  async getChatIdsByUserId(userId: number) {
    const chats = await ChatMemberEntity.find({
      where: { userId },
      select: ['chatId'],
    });

    return map(chats, 'chatId');
  }
  async isUserInChat(userId: number, chatId: number) {
    const users = await this.getUsersByChatId(chatId);

    return !!users.find(userEnt => userEnt.id === userId);
  }

  async createMessage(data: TCreateMessage) {
    const message = new MessageEntity(data);
    await message.save();

    return message;
  }

  async findUsersChat(firstUserId: number, secondUserId: number): Promise<number | null> {
    const firstChatMembers = await ChatMemberEntity.find({
      where: { userId: firstUserId },
      select: ['chatId'],
    });

    const secondChatMembers = await ChatMemberEntity.find({
      where: { userId: secondUserId },
      select: ['chatId'],
    });

    let chatId: number | null = null;

    if (firstChatMembers && secondChatMembers) {
      firstChatMembers.forEach(chatMember => {
        const isCommonChat = secondChatMembers.find(secondChatMember => secondChatMember.chatId === chatMember.chatId);

        if (isCommonChat) {
          chatId = chatMember.chatId;
          return chatId;
        } else {
          chatId = null;
        }
      });

      return chatId;
    }

    return null;
  }

  async getBroadcastChatIds(usersIds: number[], senderId: number) {
    const chatIds = await Promise.all(usersIds.map(userId => this.findUsersChat(userId, senderId)));
    const result = chatIds.filter(chatId => chatId !== null) as number[];
    return result;
  }
}

export default new ChatService();
