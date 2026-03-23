import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import testRoute from "./routes/testRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(morgan("dev")); // method,url,status and response time in dev format
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, 
  message: "Too many requests, try later",
});

app.use("/api", limiter);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoute);
app.use("/api/files", uploadRoute);
app.use("/api/messages", messageRoute);
export default app;
