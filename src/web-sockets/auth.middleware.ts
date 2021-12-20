import { Socket } from "socket.io";
import { UserEntity } from "../db/entities/user.entity";
import JwtService from "../services/jwt.service";

export const authSocketMiddleware = async (socket: Socket, next: Function) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      throw new Error("No token");
    }
    const { id } = JwtService.decode(token);
    const user = await UserEntity.findOne(id);
    socket.handshake.auth.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
