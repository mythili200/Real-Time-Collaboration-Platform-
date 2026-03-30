import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Box, TextField, IconButton, Typography, Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";

const getTokenFromCookie = () => {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];
};

export default function Collaboration() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const roomId = "room1";
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  // Load logged-in user
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => console.log("Not logged in"));
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    const newSocket = io("http://localhost:5000", {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () =>
      console.log("Socket connected:", newSocket.id),
    );
    newSocket.on("connect_error", (err) =>
      console.log("Socket error:", err.message),
    );

    // Join room
    newSocket.emit("joinRoom", roomId);

    // Load old messages
    newSocket.on("loadMessages", (msgs) => setMessages(msgs));

    // Receive new messages
    newSocket.on("receiveMessage", (msg) => {
      console.log("NEW MESSAGE RECEIVED", msg);
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev;
        return [...prev, msg];
      });
    });

    // Typing indicator
    newSocket.on("userTyping", (typingUser) => {
      if (typingUser === user._id) return; // don't show self
      setTypingUsers((prev) => [...new Set([...prev, typingUser])]);
    });

    newSocket.on("userStopTyping", (typingUser) => {
      setTypingUsers((prev) => prev.filter((u) => u !== typingUser));
    });

    return () => newSocket.disconnect();
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // Send message
  const sendMessage = () => {
    if (!input.trim() || !socket || !user?._id) return;

    const tempMsg = {
      _id: Date.now(),
      roomId,
      message: input,
      user: user._id,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempMsg]);

    socket.emit("sendMessage", { roomId, message: input });
    socket.emit("stopTyping", roomId); // stop typing
    setInput("");
  };

  // Handle typing
  const handleTyping = (value) => {
    setInput(value);

    if (!socket || !user?._id) return;

    socket.emit("typing", roomId);

    // Clear previous timeout
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // Stop typing after 1.5s of inactivity
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", roomId);
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        sx={{
          width: "800px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}>
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(135deg, #764ba2, #667eea)",
            color: "white",
            textAlign: "center",
          }}>
          <Typography variant="h6">🚀 Collaboration Room</Typography>
        </Box>

        {/* MESSAGES */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {messages.map((msg) => {
            const isMe = msg.user?.toString() === user._id;
            return (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    mb: 2,
                  }}>
                  {!isMe && <Avatar sx={{ mr: 1 }}>U</Avatar>}

                  <Box>
                    <Typography variant="caption" sx={{ color: "#ddd" }}>
                      {isMe ? "You" : "User"}
                    </Typography>

                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        mt: 0.5,
                        background: isMe
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "rgba(255,255,255,0.2)",
                        color: "white",
                        maxWidth: "250px",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        wordBreak: "break-word",
                      }}>
                      {msg.message}
                      <Typography
                        variant="caption"
                        sx={{ display: "block", fontSize: "10px", mt: 0.5 }}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })}

          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <Typography sx={{ color: "#fff", fontStyle: "italic" }}>
              {typingUsers.join(", ")} typing...
            </Typography>
          )}

          <div ref={bottomRef}></div>
        </Box>

        <Box
          sx={{
            display: "flex",
            p: 2,
            gap: 1,
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={input}
            onChange={(e) => handleTyping(e.target.value)}
            size="small"
            sx={{ background: "white", borderRadius: 3 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <IconButton
            onClick={sendMessage}
            sx={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              "&:hover": { transform: "scale(1.1)" },
            }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
