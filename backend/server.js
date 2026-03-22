import app from "./app";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  // attach socket.io to the http server
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("server is ruuning on 5000");
});
