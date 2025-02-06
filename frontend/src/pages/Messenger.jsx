import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = ({ user }) => {
  const userId = user.username;
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.emit("joinRoom", chatId);

    socket.current.on("getMessage", (message) => {
      setMessages((prev) => [...prev, { ...message, sent: message.sender === userId }]);
    });

    return () => {
      socket.current.off("getMessage");
    };
  }, [chatId, userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v2/chats/${chatId}/messages`);
        setMessages(data);

        const { data: parti } = await axios.get(`http://localhost:5000/api/v2/chats/getinfo/${chatId}`);
        const receiver = parti.participants[0] === userId ? parti.participants[1] : parti.participants[0];
        setReceiverId(receiver);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (chatId) fetchMessages();
  }, [chatId, userId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !receiverId) return;

    const message = { sender: userId, receiver: receiverId, text: newMessage, room: chatId };
    socket.current.emit("sendMessage", message);

    try {
      await axios.post("http://localhost:5000/api/v2/chats/send", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setNewMessage("");
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#AF45ED] to-[#ff9a8b] text-white p-4 rounded-t-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">
          Chat with {receiverId ? receiverId : "Loading..."}
        </h2>
      </div>

      {/* Message List Section */}
      <div className="flex-1 bg-white overflow-y-auto p-4 space-y-4 rounded-lg shadow-md mt-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${msg.sender === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg shadow-sm ${msg.sender === userId
                ? "bg-[#E4C1F9] text-black"
                : "bg-[#D3F8E2] text-black"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Section */}
      <div className="flex items-center space-x-4 mt-4 px-4 pb-4">
        <textarea
          className="flex-1 p-4 bg-[#f5f7fa] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D7A2F6]"
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button
          className="bg-[#E4C1F9] text-black p-4 rounded-lg shadow-md hover:bg-[#D7A2F6] transition duration-200"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>

  );
};

export default Messenger;