import Chat from "../models/chat.js";
import User from "../models/user.model.js";

export const getChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await Chat.find({ participants: { $in: [userId] } })
      .sort({ 'messages.timestamp': -1 })
      .select('participants lastMessage messages');

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats', error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).select('messages');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

export const sendMessage = async (req, res) => {
  const { sender, receiver, text, room } = req.body;

  try {
    if (!sender || !receiver || !text || !room) {
      return res.status(400).json({ message: 'Sender, receiver, and message text are required.' });
    }

    let chat = await Chat.findOne({ participants: { $all: [sender, receiver] } });

    const newMessage = {
      sender,
      text,
      timestamp: new Date(),
    };

    if (!chat) {
      chat = new Chat({
        participants: [sender, receiver],
        messages: [newMessage],
        lastMessage: text,
      });
      await chat.save();
    } else {

      chat.messages.push(newMessage);
      chat.lastMessage = text;
      await chat.save();
    }

    res.json({ message: 'Message sent successfully', chat });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message', error });
  }
};

export const getChatInfo = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).select('participants');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json({ participants: chat.participants });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat info', error });
  }
};

export const openChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const authUserId = req.user.id;
    const users = await User.find({ _id: { $in: [authUserId, userId] } }, "id username");
    if (users.length !== 2) {
      return res.status(404).json({ message: "One or both users not found." });
    }
    const authUser = users.find((user) => user.id === authUserId);
    const receiverUser = users.find((user) => user.id === userId);

    let chat = await Chat.findOne({
      participants: { $all: [authUser.username, receiverUser.username] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [authUser.username, receiverUser.username],
        messages: [],
        lastMessage: "",
      });
      await chat.save();
    }
    res.json({ chatId: chat._id, receiverUsername: receiverUser.username });
  } catch (error) {
    console.error("❌ Error in openChat:", error);
    res.status(500).json({ message: "Error opening chat", error });
  }
};
