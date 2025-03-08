import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { formatDistanceToNow } from "date-fns";

const MessageHome = ({ user, onSelectChat }) => {
    const [chats, setChats] = useState([]);
    const [userProfiles, setUserProfiles] = useState({});
    const userId = user.username;

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/v2/chats/${userId}`);
                const filteredChats = data.filter((chat) => chat.messages.length > 0);
                setChats(filteredChats);

                const participantIds = [...new Set(filteredChats.flatMap((chat) =>
                    chat.participants.filter((p) => p !== userId)
                ))];

                const profiles = await Promise.all(
                    participantIds.map(async (username) => {
                        const { data } = await axios.get(`http://localhost:5000/api/v2/users/${username}`);
                        return { username, profilePicture: data.profilePicture };
                    })
                );

                const profileMap = profiles.reduce((acc, profile) => {
                    acc[profile.username] = profile.profilePicture;
                    return acc;
                }, {});
                setUserProfiles(profileMap);
            } catch (error) {
                console.error("Error fetching chats or profiles:", error);
            }
        };
        fetchChats();
    }, [userId]);

    const renderChatContent = (chat) => {
        const chatPartner = chat.participants.find((p) => p !== userId);

        return (
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    {userProfiles[chatPartner] ? (
                        <img
                            src={userProfiles[chatPartner]}
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#c6a4d8] flex items-center justify-center text-white text-lg font-bold">
                            {chatPartner.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="text-sm font-medium text-[#2e2e2e]">
                    <p>{chatPartner}</p>
                    <p className="text-sm text-[#757575] truncate max-w-xs mt-1">
                        {chat.messages[chat.messages.length - 1]?.text}
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="col-span-1 lg:col-span-1">
                <Sidebar user={user} />
            </div>
            <div className="col-span-1 lg:col-span-3">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">Messages</h1>
                    {chats.length === 0 ? ( <p>Loading chats...</p> ) : (
                        <ul>
                            {chats.sort((a, b) => {
                                    const lastMessageA = a.messages[a.messages.length - 1];
                                    const lastMessageB = b.messages[b.messages.length - 1];
                                    return new Date(lastMessageB.timestamp) - new Date(lastMessageA.timestamp);
                                })
                                .map((chat) => (
                                    <li
                                        key={chat._id}
                                        className="bg-white border rounded-lg p-4 my-4 transition-all hover:shadow-md cursor-pointer"
                                        onClick={() =>
                                            onSelectChat(chat._id, chat.participants.find((p) => p !== userId))
                                        }
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-4">
                                                {renderChatContent(chat)}
                                            </div>
                                            <div className="flex flex-col items-end w-full">
                                                <span className="text-xs text-[#9e9e9e]">
                                                    {formatDistanceToNow(new Date(chat.messages[chat.messages.length - 1]?.timestamp), {addSuffix: true,})}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageHome;