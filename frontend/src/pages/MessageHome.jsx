import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const MessageHome = ({ user, onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const userId = user.username;

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

    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#AF45ED] to-[#ff9a8b] text-white py-4 px-6 rounded-t-lg flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Messages</h2>
      </div>

      {/* Chat List */}
      <div className="p-6">
        {chats.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            <p>No chats yet</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {chats
              .sort((a, b) => {
                const lastMessageA = a.messages[a.messages.length - 1];
                const lastMessageB = b.messages[b.messages.length - 1];
                return new Date(lastMessageB.timestamp) - new Date(lastMessageA.timestamp);
              })
              .map((chat) => (
                <li
                  key={chat._id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:bg-[#f8f9fa] cursor-pointer transition-all"
                  onClick={() =>
                    onSelectChat(chat._id, chat.participants.find((p) => p !== userId))
                  }
                >
                  <div className="flex items-center space-x-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 bg-[#c6a4d8] rounded-full flex items-center justify-center text-white text-lg font-bold">
                      {chat.participants.filter((p) => p !== userId)[0].charAt(0).toUpperCase()}
                    </div>
                    {/* Chat Name */}
                    <div className="text-sm font-medium text-[#2e2e2e]">
                      <p>{chat.participants.filter((p) => p !== userId).join(", ")}</p>
                      <p className="text-sm text-[#757575] truncate max-w-xs mt-1">
                        {chat.messages[chat.messages.length - 1]?.text}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end w-full">
                    {/* Timestamp */}
                    <span className="text-xs text-[#9e9e9e]">
                      {dayjs(chat.messages[chat.messages.length - 1]?.timestamp).format("h:mm A")}
                    </span>
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