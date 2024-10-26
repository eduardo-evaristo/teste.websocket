import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8000 });

let sockets = [];
server.on("connection", (socket) => {
  sockets.push(socket);

  server.on("connection", () => {
    console.log("Someone connected");
  });

  socket.on("message", (msg) => {
    console.log(`Client sent: ${msg.toString()}`);
  });
});
