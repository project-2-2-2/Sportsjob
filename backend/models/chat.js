import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }],
  messages: [messageSchema],
  lastMessage: { type: String },
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
