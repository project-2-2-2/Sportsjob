import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill.trim()) {
			setSkills([...skills, newSkill.trim()]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow rounded-lg p-6 mb-6'>
			<h2 className='text-xl font-semibold mb-4'>Skills</h2>
			<div className='flex flex-wrap gap-2'>
				{skills.map((skill, index) => (
					<div key={index} className='flex items-center bg-gray-200 px-3 py-1 rounded-full'>
						<CheckCircle size={16} className='text-green-500 mr-2' />
						<span>{skill}</span>
						{isEditing && (
							<button onClick={() => handleDeleteSkill(skill)} className='ml-2 text-red-500'>
								<X size={16} />
							</button>
						)}
					</div>
				))}
			</div>

			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='Add a skill'
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className='w-full p-2 border rounded mb-2'
					/>
					<button
						onClick={handleAddSkill}
						className='bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'
					>
						Add Skill
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button onClick={handleSave} className='mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300'>
							Save Changes
						</button>
					) : (
						<button onClick={() => setIsEditing(true)} className='mt-4 text-primary hover:text-primary-dark transition duration-300'>
							Edit Skills
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default SkillsSection;

