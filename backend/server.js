import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { connectDB } from "./lib/db.js";
import connectionRoutes from "./routes/connection.route.js"
import cookieParser from 'cookie-parser';

import postRoutes from "./routes/post.route.js"
import userRoutes from "./routes/user.route.js";

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
// app.use("/api/v2/auth",authRoutes);
app.use("/api/v2/users",userRoutes)
app.use("/api/v2/posts",postRoutes);
app.use("/api/v2/notifications",notificationRoutes);
app.use("/api/v2/connections",connectionRoutes);
app.listen(PORT,()=> {
    console.log(`server running on port ${PORT}`);
    connectDB();
}); 
