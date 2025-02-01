import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
 import LoginPage from "./pages/LoginPage";

import Messenger from "./pages/Messenger";
import MessageHome from "./pages/MessageHome";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";

function App() {

	const navigate = useNavigate();

	const handleSelectChat = (chatId, receiverId) => {
		navigate(`chats/${chatId}/${receiverId}`);
	};
	
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});
	
	if (isLoading) return null;

	return (
		<Layout>

			<Routes>
			<Route path="/" element={!authUser ? <LandingPage /> : <Navigate to="/home" />} />
			<Route path="/chatapp" element = {authUser ? <MessageHome user = {authUser} onSelectChat={handleSelectChat} /> : <Navigate to="/home" />} />
			<Route path="/chats/:chatId/:receiverId" element={<Messenger user= {authUser} />} />
			<Route path='/home' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/notifications' element={authUser?<NotificationsPage />:<Navigate to={"/login"}/>}/> 
  			</Routes>
			<Toaster />
		</Layout>
	);
}

export default App;