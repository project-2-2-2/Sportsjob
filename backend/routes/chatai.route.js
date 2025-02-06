import express from 'express';
import {
  createConversation,
  sendMessage,
  getConversationMessages
} from '../controllers/chataiController.js';

const router = express.Router();

router.post('/conversations', createConversation);
router.post('/messages', sendMessage);
router.get('/conversations/:conversationId/messages', getConversationMessages);

export default router;