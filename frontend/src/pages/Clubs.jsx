import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { UserPlus } from "lucide-react";
import Connect from "../components/connect";
import Best from "../components/Best.jsx";

const Clubs = () => {
	const { data: user } = useQuery({ queryKey: ["authUser"] });

	const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: () => axiosInstance.get("/connections/requests"),
	});

	const { data: connections } = useQuery({
		queryKey: ["connections"],
		queryFn: () => axiosInstance.get("/connections"),
	});

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='col-span-1 lg:col-span-1'>
				<Sidebar user={user} />
			</div>
			<div className='col-span-1 lg:col-span-3'>
				<div className='bg-indigo-900 rounded-lg shadow p-6 mb-6'>
					<h1 className='text-2xl font-bold mb-6'>My Clubs/Players</h1>

					{connectionRequests?.data?.length > 0 ? (
						<div className='mb-8'>
							<h2 className='text-xl font-semibold mb-2'>Connection Request</h2>
							<div className='space-y-4'>
								{connectionRequests.data.map((request) => (
									<Connect key={request.id} request={request} />
								))}
							</div>
						</div>
					) : (
						<div className='bg-orange-200 rounded-lg shadow p-6 text-center mb-6'>
							<UserPlus size={48} className='mx-auto text-gray-400 mb-4' />
							<h3 className='text-xl font-semibold mb-2'>Lets play</h3>
							<p className='text-gray-600'>
								Decision pending
							</p>
							<p className='text-gray-600 mt-2'>
								Increase your partnership
 							</p>
						</div>
					)}
					{connections?.data?.length > 0 && (
						<div className='mb-8'>
							<h2 className='text-xl font-semibold mb-4'>My Teams/Players</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{connections.data.map((connection) => (
									<Best key={connection._id} user={connection} isConnection={true} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Clubs;