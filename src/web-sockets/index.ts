import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { authSocketMiddleware } from "./auth.middleware";
import { WebsocketClientService } from "./socket-clients.service";

export const registerSockets = (app: Express) => {
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      credentials: true,
    },
  });

  io.use(authSocketMiddleware);

  io.on("connection", client => {
    const user = client.handshake.auth.user;
    const clients = WebsocketClientService.clients.get(user.id);

    if (!clients) {
      WebsocketClientService.clients.set(user.id, [client]);
    } else {
      WebsocketClientService.clients.set(user.id, [...clients, client]);
    }

    client.on("test", data => {
      clients.forEach(client => client.emit("testConnection", { message: data }));
    });

    client.on("disconnect", () => {
      /* … */
    });
  });
  // io.use((socket: ISocketError, next) => {
  //   return socket._error(socket);
  // });

  return server;
};
