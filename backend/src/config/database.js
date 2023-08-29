import mongoose from "mongoose";
import { socket } from "./socket.js";
import jwt from "jsonwebtoken";

let PORT = process.env.APP_ENV == 'local' ? process.env.PORT  : process.env.APP_PRODUCTION_PORT  ;

export const mongooseConnection = (app) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((result) => {
      const server = app.listen(PORT);
      console.log(
        "\u001b[" +
          34 +
          "m" +
          `Server started in mode on port: ${PORT} and Connected to Database on env: ${process.env.APP_ENV}` +
          "\u001b[0m"
      );
      const io = socket.init(server);
      console.log(
        "\u001b[" +
          34 +
          "m" +
          `Socket Initalized` +
          "\u001b[0m"
      );

      io.use((socket, next)=>{
        const token = socket.handshake.query.token;
        if (!token) {
            const error = new Error("Unauthorized request!");
            error.statusCode = 401;           
            throw ( error);
        }
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          socket.userId = decoded.userId;
          next();
        } catch (er) {
            const error = new Error("Authentication request!");
            error.statusCode = 401;
            throw ( error);
        }
      })
      io.on("connection", (socket) => {
        console.log(`User ${socket.userId} connected.`);
        socket.join(socket.userId);
      });
    })
    .catch((err) => {
      console.log(err);
    });


};
