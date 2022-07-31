import { rateLimit } from "express-rate-limit";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import dotenv from "dotenv";
import path, { parse } from "path";
import cors from "cors";
import mongoSanaitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server);

// Global Middlewares
// Cors security
app.use(cors());

// Set security HTTP headers
app.use("/api/", helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, try again in 60 minutes",
});
app.use("/api", limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());

// Data sanitization agains NOSQL query injection
app.use(mongoSanaitize());

// Serving the frontend
app.use(express.static(path.resolve("../client/public")));

// Environmental
dotenv.config({ path: "./config.env" });

// Routes
import booksRouter from "./routers/bookRouter.js";
app.use("/api", booksRouter);

import usersRouter from "./routers/userRouter.js";
app.use("/api", usersRouter);

// Database connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// .connect(process.env.DATABASE_LOCAL, {
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

 io.on('connection', socket => {
  socket.on('bookListUpdate', () => { io.emit('bookListBroadcast'); }); // listen to the event
});

export default app;
