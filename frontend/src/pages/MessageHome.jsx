import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./MessageHome.css";

const MessageHome = ({ user,onSelectChat }) => {

  const [chats, setChats] = useState([]);
  const userId = user.username;
  console.log(userId);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/v2/chats/${userId}`);
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats", error);
      }
    };
    fetchChats();
  }, [userId]);

  return (
    <div className="message-home-container">
      <div className="header">
        <h2>Messages</h2>
      </div>

      <div className="chat-list">
        {chats.length === 0 ? (
          <div className="no-chats">
            <p>No chats yet</p>
          </div>
        ) : (
          <ul>
            {chats.sort((a, b) => {
                const lastMessageA = a.messages[a.messages.length - 1];
                const lastMessageB = b.messages[b.messages.length - 1];
                return new Date(lastMessageB.timestamp) - new Date(lastMessageA.timestamp);
              }).map((chat) => (
                <li
                  key={chat._id}
                  className="chat-item"
                  onClick={() => onSelectChat(chat._id, chat.participants.find((p) => p !== userId))}
                >
                  <div className="chat-info">
                    <div className="chat-name">
                      <p>{chat.participants.filter((p) => p !== userId).join(", ")}</p>
                    </div>
                    <div className="chat-message">
                      <p className="last-message">{chat.messages[chat.messages.length - 1]?.text}</p>
                    </div>
                  </div>
                  <div className="chat-time">
                    {dayjs(chat.messages[chat.messages.length - 1]?.timestamp).format("h:mm A")}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageHome;
