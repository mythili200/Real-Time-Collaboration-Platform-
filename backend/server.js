import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { messageModel } from "./models/messageModel.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";
dotenv.config();
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.use(async (socket, next) => {
  try {
    const cookies = socket.handshake.headers.cookie;
    if (!cookies) return next(new Error("Unauthorized"));

    const { token } = cookie.parse(cookies);
    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded; // attach user
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join room + load old messages
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    const messages = await messageModel
      .find({ roomId })
      .sort({ createdAt: 1 })
      .limit(50);

    socket.emit("loadMessages", messages);
  });

  // Save message to DB and emit to room
  socket.on("sendMessage", async ({ roomId, message }) => {
    try {
      console.log("Saving message:", message, "from user:", socket.user._id);

      const newMessage = await messageModel.create({
        roomId,
        message,
        user: socket.user._id,
      });

      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });
  socket.on("typing", (roomId) => {
    socket.to(roomId).emit("userTyping", socket.user._id);
  });

  socket.on("stopTyping", (roomId) => {
    socket.to(roomId).emit("userStopTyping", socket.user._id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});