import mongoose from "mongoose";
import Chat from "./models/chat.js"; // Update with the correct path to your model

mongoose.connect("mongodb+srv://sughanvasan14:dEMsYmwH3E8kqtnR@cluster0.wzj4v.mongodb.net/linkedin_db?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected"))
.catch(err => console.error("Database connection error:", err));

const fillDatabase = async () => {
  try {
    await Chat.deleteMany({}); // Clear existing chats (optional)

    const chats = [
      {
        participants: ["testuser", "testuser1"],
        messages: [
          { sender: "testuser", text: "Hey, how's it going?" },
          { sender: "testuser1", text: "I'm good! What about you?" },
          { sender: "testuser", text: "Doing great, just working on a project." },
        ],
        lastMessage: "Doing great, just working on a project."
      },
      {
        participants: ["testuser1", "testuser"],
        messages: [
          { sender: "testuser1", text: "Hello again!" },
          { sender: "testuser", text: "Hey! What's up?" },
        ],
        lastMessage: "Hey! What's up?"
      }
    ];

    await Chat.insertMany(chats);
    console.log("Chats populated successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating chats:", error);
    mongoose.connection.close();
  }
};

fillDatabase();
