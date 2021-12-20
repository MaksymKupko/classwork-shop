import { Express } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { UserEntity } from '../db/entities/user.entity';
import chatService from '../services/chat.service';
import { IBroadcastMessagePayload, TDeleteMessage, TMessageEdit, TSendMessage, TSocketClient } from '../tools/types';
import { authSocketMiddleware } from './auth.middleware';
import { WebsocketClientService } from './socket-clients.service';
import { WsChatEventsEnum } from './socket-events.enum';

export const registerSockets = (app: Express) => {
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      credentials: true,
    },
  });

  io.use(authSocketMiddleware);

  io.on('connection', (client: TSocketClient) => {
    WebsocketClientService.joinUserConnection(client);
    let user: UserEntity;

    if (client.data?.user) {
      user = client.data?.user;
    }

    client.on(WsChatEventsEnum.SEND_MESSAGE, async (payload: TSendMessage) => {
      if (!chatService.isUserInChat(user.id, payload.chatId)) {
        return;
      }
      const message = chatService.createMessage({
        ...payload,
        senderId: user.id,
      });
      WebsocketClientService.emitEventToChat(payload.chatId, WsChatEventsEnum.RECEIVE_MESSAGE, message);
    });

    client.on(WsChatEventsEnum.EDIT_MESSAGE, async (payload: TMessageEdit) => {
      const { messageId } = payload;
      if (!chatService.isMessageSender(user.id, messageId)) {
        return;
      }
      const editedMessage = await chatService.editMessage(payload);
      if (editedMessage) {
        WebsocketClientService.emitEventToChat(
          editedMessage.chatId,
          WsChatEventsEnum.RECEIVE_EDITED_MESSAGE,
          editedMessage
        );
      }
    });

    client.on(WsChatEventsEnum.DELETE_MESSAGE, async (payload: TDeleteMessage) => {
      if (!chatService.isMessageSender(user.id, payload.messageId)) {
        return;
      }

      const deletedMessage = await chatService.deleteMessage(payload.messageId);
      if (deletedMessage) {
        WebsocketClientService.emitEventToChat(deletedMessage.chatId, WsChatEventsEnum.MESSAGE_DELETED, payload);
      }
    });

    client.on(WsChatEventsEnum.SEND_BROADCAST_MESSAGE, async (payload: IBroadcastMessagePayload) => {
      const { userIds, data } = payload;

      const chatIds = await chatService.getBroadcastChatIds(userIds, user.id);

      await Promise.all(
        chatIds.map(async chatId => {
          const newMessage = await chatService.createMessage({
            senderId: user.id,
            chatId,
            data,
          });

          WebsocketClientService.emitEventToChat(chatId, WsChatEventsEnum.RECEIVE_MESSAGE, newMessage);
        })
      );
    });

    client.on('disconnect', () => {
      WebsocketClientService.closeUserConnection(client);
    });
  });

  return server;
};
