import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const server = http.createServer(app);

const io = new Server(server, {
  // attach socket.io to the http server
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Send Message / Update
  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} `);
});
