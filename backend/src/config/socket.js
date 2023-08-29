import { Server } from "socket.io";

let io;

export const socket = {
  init: (httpServer) => {
    io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust the origin as per your requirements
      credentials: true,
    }});
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};

export const emit = async (event, body) => {
  return await socket.getIO().emit(event, body);
};
export const to = async (to, event, body) => {
  return await socket.getIO().to(to).emit(event, body);
};
