import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { connectDB } from "./lib/db.js";
import connectionRoutes from "./routes/connection.route.js"
import cookieParser from 'cookie-parser';
import http from "http";
import { Server } from "socket.io";
 import chatRoutes from "./routes/chat.route.js";
import postRoutes from "./routes/post.route.js"
import userRoutes from "./routes/user.route.js";
import { OpenAI } from 'openai';
import chatairoutes from "./routes/chatai.route.js";
import cors from "cors";
 
dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json({limit:"5mb"}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use("/api/v2/auth",authRoutes);
app.use("/api/v2/chats", chatRoutes);
// app.use("/api/v2/auth",authRoutes);
app.use("/api/v2/users",userRoutes)
app.use("/api/v2/posts",postRoutes);
app.use("/api/v2/notifications",notificationRoutes);
app.use("/api/v2/connections",connectionRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", (chatId) => {
        socket.join(chatId);
    });

    socket.on("sendMessage", (message) => {
        const { sender, receiver, text, room } = message;
        io.to(room).emit("getMessage", message);
    });
});

  
  
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});