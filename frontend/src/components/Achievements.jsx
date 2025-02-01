import { Trophy, X } from "lucide-react";
import { useState } from "react";

const AchievementsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [achievements, setAchievements] = useState(userData.achievements || []);
	const [newAchievement, setNewAchievement] = useState({
		title: "",
		sport: "",
		year: "",
		description: "",
	});

	const handleAddAchievement = () => {
		if (newAchievement.title && newAchievement.sport && newAchievement.year) {
			setAchievements([...achievements, newAchievement]);
			setNewAchievement({ title: "", sport: "", year: "", description: "" });
		}
	};

	const handleDeleteAchievement = (id) => {
		setAchievements(achievements.filter((ach) => ach._id !== id));
	};

	const handleSave = () => {
		onSave({ achievements });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Sports Achievements</h2>
			{achievements.map((ach) => (
				<div key={ach._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<Trophy size={20} className='mr-2 mt-1 text-yellow-500' />
						<div>
							<h3 className='font-semibold'>{ach.title}</h3>
							<p className='text-gray-600'>{ach.sport}</p>
							<p className='text-gray-500 text-sm'>{ach.year}</p>
							<p className='text-gray-500 text-sm'>{ach.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteAchievement(ach._id)} className='text-red-500'>
							<X size={20} />
						</button>
					)}
				</div>
			))}
			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='Achievement Title'
						value={newAchievement.title}
						onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='text'
						placeholder='Sport'
						value={newAchievement.sport}
						onChange={(e) => setNewAchievement({ ...newAchievement, sport: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='number'
						placeholder='Year'
						value={newAchievement.year}
						onChange={(e) => setNewAchievement({ ...newAchievement, year: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<textarea
						placeholder='Description'
						value={newAchievement.description}
						onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<button
						onClick={handleAddAchievement}
						className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300'
					>
						Add Achievement
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className='mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300'
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-red-500 hover:text-red-600 transition duration-300'
						>
							Edit Achievements
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default AchievementsSection;
