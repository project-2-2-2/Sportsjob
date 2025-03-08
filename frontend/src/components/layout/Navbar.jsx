import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Tally4, Home, LogOut, User, Users, MessageSquareDiff, Bot, Search } from "lucide-react";
import { useTheme } from "../../../contexts/theme";
import { RiMoonFill, RiSunFill } from "@remixicon/react";
import './button.css'

const Navbar = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchInput.trim()) {
			navigate(`/profile/${searchInput.trim()}`);
		}
	};

	const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
	const unreadConnectionRequestsCount = connectionRequests?.data?.length;

	return (
		<nav id='colo' className='bg-secondary shadow-md sticky top-0 z-10'>
			<div className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center py-3'>
					<div className="flex items-center space-x-4">
						<Link to="/" className="flex items-center space-x-2 no-underline">
							<img
								className="h-11 rounded-full shadow-md hover:scale-110 transition-transform duration-100 hover:shadow-lg"
								src="logo.svg"
								alt="Logo"
							/>
							<h2 className="font-bold text-yellow-100">Sports is Great</h2>
						</Link>
					</div>

					<div className='flex items-center gap-2 md:gap-6'>
						{authUser ? (
							<>
								<form
									onSubmit={handleSearch}
									className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 bg-yellow-500 rounded-full"
								>
									<input
										type="text"
										placeholder="Search"
										value={searchInput}
										onChange={(e) => setSearchInput(e.target.value)}
										className="px-4 py-2 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
									/>
									<button
										type="submit"
										className="text-white px-4 py-2 flex items-center justify-center hover:bg-yellow-600 transition-colors duration-200"
									>
										<Search size={20} />
									</button>
								</form>

								<Link to={"/"} className='text-neutral flex flex-col items-center'>
									<Home size={20} />
									<span className='text-xs hidden md:block'>Feed</span>
								</Link>

								<Link to='/askai' className='text-neutral flex flex-col items-center relative'>
									<Bot size={20} />
									<span className='text-xs hidden md:block'>AskAI</span>
								</Link>

								<Link to='/livecricket' className='text-neutral flex flex-col items-center relative'>
									<Tally4 size={20} />
									<span className='text-xs hidden md:block'>Live Scores</span>
								</Link>

								<Link to='/clubsplayers' className='text-neutral flex flex-col items-center relative'>
									<Users size={20} />
									<span className='text-xs hidden md:block'>Connections</span>
									{unreadConnectionRequestsCount > 0 && (
										<span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                                        rounded-full size-3 md:size-4 flex items-center justify-center'>
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>

								<Link to='/chatapp' className='text-neutral flex flex-col items-center relative'>
									<MessageSquareDiff size={20} />
									<span className='text-xs hidden md:block'>Messages</span>
								</Link>

								<Link to='/notifications' className='text-neutral flex flex-col items-center relative'>
									<Bell size={20} />
									<span className='text-xs hidden md:block'>Notifications</span>
									{unreadNotificationCount > 0 && (
										<span className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                                        rounded-full size-3 md:size-4 flex items-center justify-center'>
											{unreadNotificationCount}
										</span>
									)}
								</Link>

								<div>
									<button className="theme-btn" onClick={toggleTheme}>
										{theme !== "dark" ? (
											<RiSunFill color="#6d6d6d" />
										) : (
											<RiMoonFill color="#6d6d6d" />
										)}
									</button>
								</div>

								<Link
									to={`/profile/${authUser.username}`}
									className='text-neutral flex flex-col items-center'
								>
									<User size={20} />
									<span className='text-xs hidden md:block'>Profile</span>
								</Link>

								<button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to='/login' className='btn btn-ghost'>
									Sign In
								</Link>
								<Link to='/signup' className='btn btn-primary'>
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;