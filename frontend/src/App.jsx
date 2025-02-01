import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
 import LoginPage from "./pages/LoginPage";

import LandingPage from "./pages/LandingPage";
import PostPage from "./pages/PostPage";
import SignUpPage from "./pages/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Please from "./pages/Please.jsx";
import Clubs from "./pages/Clubs"
import Askai from "./pages/askai";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
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
		 
			<Route path='/home' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/notifications' element={authUser?<NotificationsPage />:<Navigate to={"/login"}/>}/> 
				<Route path='/clubsplayers' element={authUser?<Clubs />:<Navigate to={"/login"}/>}/> 
				<Route path='/postt/:clientid' element={authUser?<PostPage />:<Navigate to={"/login"}/>}/> 
				<Route path='/profile/:username' element={authUser?<ProfilePage/>:<Navigate to={"/login"}/>}/> 
				<Route path='/livecricket' element={authUser?<Askai/>:<Navigate to={"/login"}/>}/>
				<Route path='/askai' element={authUser?<Please/>:<Navigate to={"/login"}/>}/>

  			</Routes>
			<Toaster />
		</Layout>
	);
}

export default App;