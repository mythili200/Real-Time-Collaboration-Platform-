import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(morgan("dev")); // method,url,status and response time in dev format
app.use(cookieParser());

export default app;
