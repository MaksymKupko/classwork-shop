import { UserEntity } from "../../db/entities/user.entity";
import { Response } from "express";
import { UserRoleEnum } from "../../enums/user-role.enum";
import { IRequest } from "../../tools/types";
import JwtService from "../../services/jwt.service";

export const authMiddleware = async (req: IRequest, res: Response, next) => {
  const token = (req.headers.authorization || "").split(" ")[1];

  try {
    const { id } = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export const authByRoleMiddleware = (role: UserRoleEnum) => {
  return async (req: IRequest, res: Response, next) => {
    const user = req.user;
    if (!user || user.role !== role) {
      return res.status(401).send("Invalid Token");
    }
    next();
  };
};
