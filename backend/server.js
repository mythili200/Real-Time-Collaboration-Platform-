import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { messageModel } from "./models/messageModel.js";

dotenv.config();
connectDB();
const server = http.createServer(app);

const io = new Server(server, {
  // attach socket.io to the http server
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Invalid Token"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ Join Room + Load old messages
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);

    const messages = await messageModel
      .find({ roomId })
      .sort({ createdAt: 1 })
      .limit(50);

    socket.emit("loadMessages", messages); // send old messages only to this user
  });

  //Send Message (SAVE + BROADCAST)
  socket.on("sendMessage", async ({ roomId, message }) => {
    const newMessage = await messageModel.create({
      roomId,
      message,
      user: socket.user._id,
    });

    io.to(roomId).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} `);
});
