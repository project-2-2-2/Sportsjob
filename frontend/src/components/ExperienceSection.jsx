import { Trophy, X } from "lucide-react";
import { useState } from "react";
 
const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.sportsExperience || []);
	const [newExperience, setNewExperience] = useState({
		role: "",
		sport: "",
		club: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyPlaying: false,
	});

	const handleAddExperience = () => {
		if (newExperience.role && newExperience.sport && newExperience.club && newExperience.startDate) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				role: "",
				sport: "",
				club: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyPlaying: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ sportsExperience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyPlayingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyPlaying: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Sports Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<Trophy size={20} className='mr-2 mt-1' />
						<div>
							<h3 className='font-semibold'>{exp.role}</h3>
							<p className='text-gray-600'>{exp.sport} - {exp.club}</p>
							 
							<p className='text-gray-700'>{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className='text-red-500'>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='Role/Position'
						value={newExperience.role}
						onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='text'
						placeholder='Sport'
						value={newExperience.sport}
						onChange={(e) => setNewExperience({ ...newExperience, sport: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='text'
						placeholder='Club/Team'
						value={newExperience.club}
						onChange={(e) => setNewExperience({ ...newExperience, club: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<input
						type='date'
						placeholder='Start Date'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<div className='flex items-center mb-2'>
						<input
							type='checkbox'
							id='currentlyPlaying'
							checked={newExperience.currentlyPlaying}
							onChange={handleCurrentlyPlayingChange}
							className='mr-2'
						/>
						<label htmlFor='currentlyPlaying'>I currently play here</label>
					</div>
					{!newExperience.currentlyPlaying && (
						<input
							type='date'
							placeholder='End Date'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className='w-full p-2 border rounded mb-2'
						/>
					)}
					<textarea
						placeholder='Description'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className='w-full p-2 border rounded mb-2'
					/>
					<button
						onClick={handleAddExperience}
						className='bg-red-400 text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
					>
						Add Sports Experience
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button onClick={handleSave} className='mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'>
							Save Changes
						</button>
					) : (
						<button onClick={() => setIsEditing(true)} className='mt-4 text-primary hover:text-primary-dark transition duration-300'>
							Edit Sports Experience
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default ExperienceSection;
