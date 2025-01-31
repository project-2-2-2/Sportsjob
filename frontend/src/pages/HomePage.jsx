import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../../contexts/theme";
 import './HomePage.css';
 import { Users } from "lucide-react";
 
 import Post from "../components/layout/Post"
 import PostCreation from "../components/PostCreation"
 import RecommendedUser from "../components/RecommendedUser";

 const HomePage = () => {
	const { data: authUser } = useQuery({ queryKey: ["authUser"]  });
	const { theme } = useTheme();

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const { data: posts } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			const res = await axiosInstance.get("/posts");
			return res.data;
		},
	});

	console.log("posts", posts);

	return (
 	 	<div id="home" className={`home-${theme} `}>
 					<div className=' grid grid-cols-1 lg:grid-cols-4 gap-6 '>
 			<div className='  hidden lg:block lg:col-span-1 '>
 				<Sidebar user={authUser} />
			  
 					<PostCreation user={authUser}/>
					</div>
			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>  
{posts?.map((post) => (
	<Post key={post._id} post={post} />
))}

{posts?.length===0 && (
	<div className='bg-white rounded-lg shadow p-8 text-center'>
	 	<div className='mb-6'>
			<Users size={64} className='mx-auto text-orange-500' />
		</div>
		<h2 className='text-2xl font-bold mb-4 text-red-800'>Please post</h2>
		<p className='text-purple-600 mb-6'>join any team or meet any expert</p>
		<img src="data:image/jpeg;base64,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"
	/>
	</div>
)}
 </div>

{recommendedUsers?.length > 0 && (
				<div className='col-span-1 lg:col-span-1 hidden lg:block'>
					<div className='bg-secondary rounded-lg shadow p-4'>
						<h2 className='font-semibold mb-4'>Clubs/Players you may know</h2>
						{recommendedUsers?.map((user) => (
							<RecommendedUser key={user._id} user={user} />
						))}
					</div>
				</div>
			)}
 
 
 
	 </div>
	 <div></div>
 
 </div>
        
	);
};
export default HomePage;