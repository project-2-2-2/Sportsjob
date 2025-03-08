import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { ArrowLeft } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const Messenger = ({ user }) => {
	const userId = user.username;
	const { chatId } = useParams();
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [receiverId, setReceiverId] = useState(null);
	const [receiverProfile, setReceiverProfile] = useState(null);
	const socket = useRef();
	const messagesEndRef = useRef(null);

	useEffect(() => {
		socket.current = io("http://localhost:5000");
		socket.current.emit("joinRoom", chatId);

		socket.current.on("getMessage", (message) => {
			setMessages((prev) => [
				...prev,
				{ ...message, sent: message.sender === userId },
			]);
		});

		return () => {
			socket.current.off("getMessage");
		};
	}, [chatId, userId]);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:5000/api/v2/chats/${chatId}/messages`
				);
				setMessages(data);

				const { data: parti } = await axios.get(
					`http://localhost:5000/api/v2/chats/getinfo/${chatId}`
				);
				const receiver = parti.participants[0] === userId ? parti.participants[1] : parti.participants[0];

				setReceiverId(receiver);

				const { data: profileData } = await axios.get(
					`http://localhost:5000/api/v2/users/${receiver}`
				);
				setReceiverProfile(profileData);
			} catch (error) {
				console.error("Error fetching messages:", error);
			}
		};
		if (chatId) fetchMessages();
	}, [chatId, userId]);

	const sendMessage = async () => {
		if (!newMessage.trim() || !receiverId) return;
		const message = {
			sender: userId,
			receiver: receiverId,
			text: newMessage,
			room: chatId,
		};
		socket.current.emit("sendMessage", message);

		try {
			await axios.post("http://localhost:5000/api/v2/chats/send", message);
		} catch (error) {
			console.error("Error sending message:", error);
		}
		setNewMessage("");
	};
	useEffect(() => {
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
		}, 100);
	}, [messages]);

	const formatDate = (timestamp) => {
		const msgDate = dayjs(timestamp);
		if (msgDate.isToday()) return "Today";
		if (msgDate.isYesterday()) return "Yesterday";
		return msgDate.format("DD/MM/YYYY");
	};

	return (
		<div className="h-screen flex flex-col max-w-3xl mx-auto bg-white shadow-lg rounded-lg">

			<div className="sticky top-[68px] z-40 bg-gradient-to-r from-[#AF45ED] to-[#ff9a8b] text-white p-4 rounded-t-lg flex items-center space-x-4 shadow-md">
				<button
					onClick={() => window.history.back()}
					className="p-2 rounded-full hover:bg-[#D97EF4]"
				>
					<ArrowLeft size={24} />
				</button>

				<img
					src={receiverProfile?.profilePicture || 
						`https://ui-avatars.com/api/?name=${receiverId || "User"}`}
					alt="User Avatar"
					className="h-10 w-10 rounded-full object-cover"
				/>

				<div>
					<h2 className="text-lg font-semibold">
						{receiverProfile?.name || receiverId || "Loading..."}
					</h2>
				</div>
			</div>

			<div
				className="flex-1 overflow-y-auto p-4 space-y-2"
				style={{ maxHeight: "calc(100vh - 140px)" }}
			>
				{messages.map((msg, index) => {
					const showDateHeader = index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp);

					return (
						<div key={index}>
							{showDateHeader && (
								<div className="text-center text-sm text-gray-500 my-2">
									{formatDate(msg.timestamp)}
								</div>
							)}

							<div
								className={`flex items-start ${ msg.sender === userId ? "justify-end" : "justify-start" }`} 
							>
								<div
									className={`max-w-[75%] p-3 rounded-lg shadow-sm ${ msg.sender === userId ? "bg-[#E4C1F9] text-black" : "bg-[#D3F8E2] text-black" }`}
								>
									{msg.text}
									<div className="text-right text-xs text-gray-500 mt-1">
										{dayjs(msg.timestamp).format("h:mm A")}
									</div>
								</div>
							</div>
						</div>
					);
				})}
				<div ref={messagesEndRef} />
			</div>

			<div className="sticky bottom-[5px] w-full bg-white border-t border-gray-200 p-3 flex items-center space-x-4">
				<textarea
					className="flex-1 p-3 bg-[#f5f7fa] rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D7A2F6]"
					placeholder="Type a message..."
					onChange={(e) => setNewMessage(e.target.value)}
					value={newMessage}
					rows="1"
				/>
				<button
					className="bg-[#E4C1F9] text-black p-3 rounded-lg shadow-md hover:bg-[#D7A2F6] transition duration-200"
					onClick={sendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Messenger;