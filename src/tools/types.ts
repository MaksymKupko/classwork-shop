import { UserEntity } from '../db/entities/user.entity';
import { Request } from 'express';
import { UserRoleEnum } from '../enums/user-role.enum';
import { BaseEntity } from 'typeorm';
import { CardEntity } from '../db/entities/card.entity';
import { Socket } from 'socket.io';

export interface IRequest extends Request {
  user: UserEntity;
}

export interface IEntityRequest<T extends BaseEntity> extends IRequest {
  entity: T;
}

export interface JwtPayload {
  role: UserRoleEnum;

  id: number;

  login: string;
}
export interface IChatPayload {
  userId: number;

  chatId: number;

  messageId: number;

  data: string;
}

export type TCardTransactionParams = Pick<CardEntity, 'number' | 'cvv' | 'expired'>;
export type TCardTransactionResponse = { balance: number };
export type TCardReturn = TCardTransactionParams & TCardTransactionResponse & { type: string };

export type TSendMessage = Omit<IChatPayload, 'messageId'>;

export type TDeleteMessage = Pick<IChatPayload, 'messageId'>;

export type TCreateMessage = {
  senderId: number;
  chatId: number;
  data: string;
};

export type TMessageEdit = Pick<IChatPayload, 'messageId' | 'data'>;

export interface TSocketClient extends Socket {
  data: { user?: UserEntity };
}

export type IBroadcastMessagePayload = {
  userIds: number[];
  data: string;
};
