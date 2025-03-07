import express from "express";
import { getChats, getMessages, sendMessage, getChatInfo, openChat } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/:userId', getChats, protectRoute);
router.get('/getinfo/:chatId', getChatInfo, protectRoute);
router.get('/:chatId/messages', getMessages, protectRoute);
router.post('/send', sendMessage, protectRoute);
router.post('/open',protectRoute ,openChat);

export default router;