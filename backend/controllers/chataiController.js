import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';
import { generateAIResponse } from '../services/aiService.js';

export const createConversation = async (req, res) => {
  try {
    const { userId } = req.body;
    const conversation = new Conversation({ userId });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { content, conversationId } = req.body;
    
    const userMessage = new Message({
      content,
      sender: 'user',
      conversationId
    });
    await userMessage.save();
    
    const aiResponse = await generateAIResponse(content);
    
    const aiMessage = new Message({
      content: aiResponse,
      sender: 'ai',
      conversationId
    });
    await aiMessage.save();
    
    await Conversation.findByIdAndUpdate(conversationId, {
      lastUpdated: Date.now()
    });
    
    res.status(201).json({
      userMessage,
      aiMessage
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};