import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "./Messenger.css";

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
        console.log(message);
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
    <div className="messenger">
      <div className="chatBox">
        <div className="chatTitle">
          Chat with {receiverId ? receiverId : "Loading..."}
        </div>
        <div className="chatBoxTop">
          {messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.sender === userId ? "sent" : "received"}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessage"
            placeholder="Type a message..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button className="chatSubmitButton" onClick={sendMessage}>Send</button>
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
