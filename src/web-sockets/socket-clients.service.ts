import { Socket } from 'socket.io';
import { ChatMemberEntity } from '../db/entities/chat-member.entity';
import { TSocketClient } from '../tools/types';
import { WsChatEventsEnum } from './socket-events.enum';

export class WebsocketClientService {
  public static clients = new Map<number, Socket[]>();

  public static joinUserConnection(client: TSocketClient) {
    if (client.data.user) {
      const userId = client.data.user.id;

      const clients = this.clients.get(userId);

      if (!clients) {
        this.clients.set(userId, [client]);
      } else {
        this.clients.set(userId, [...clients, client]);
      }
    }
  }

  public static closeUserConnection(client: TSocketClient) {
    if (client.data.user) {
      const userId = client.data.user.id;
      const arr = this.clients.get(userId);
      if (arr) {
        const index = arr.findIndex(({ id }) => id === client.id);
        arr.splice(index, 1);
        this.clients.set(userId, arr);
      }
    }
  }

  public static async emitEventToChat(chatId: number, event: WsChatEventsEnum, payload?: any) {
    const chatMembers = await ChatMemberEntity.find({ where: { chatId } });

    chatMembers.forEach(member => {
      const membersConnections = this.clients.get(member.userId);

      membersConnections && membersConnections.forEach(connection => connection.emit(event, payload));
    });
  }
}
