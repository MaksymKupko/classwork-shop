import { UserEntity } from "../db/entities/user.entity";
import { Request } from "express";
import { UserRoleEnum } from "../enums/user-role.enum";

export interface IRequest extends Request {
  user: UserEntity;
}

export interface JwtPayload {
  role: UserRoleEnum;

  id: number;

  login: string;
}
