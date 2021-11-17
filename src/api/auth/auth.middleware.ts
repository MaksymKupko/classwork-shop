import { Response } from "express";
import { UserEntity } from "../../db/entities/user.entity";
import { UserRoleEnum } from "../../enums/user-role.enum";
import JwtService from "../../services/jwt.service";
import { IRequest } from "../../tools/types";
import { HttpError, wrapper } from "../../tools/wrapper.helpers";

export const authMiddleware = wrapper(async (req: IRequest, res: Response, next) => {
  const token = (req.headers.authorization || "").split(" ")[1];

  try {
    const { id } = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    req.user = user;
    next();
  } catch (err) {
    throw new HttpError("Invalid Token", 401);
  }
});

export const authByRoleMiddleware = (role: UserRoleEnum) =>
  wrapper(async (req: IRequest, res: Response, next) => {
    const user = req.user;

    if (user.role !== role) {
      throw new HttpError(`This action is not permitted for role ${user.role}`, 401);
    }
    next();
  });
