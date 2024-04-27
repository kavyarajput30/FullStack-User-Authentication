import express, { urlencoded, json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
    origin: "http://localhost:5173", // Replace with your frontend domain
    credentials: true // Enable credentials (cookies, authorization headers) to be sent cross-domain
  };

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

import userRouter from "./routes/user.route.js";

app.use("/api/user", userRouter);

export default app;
