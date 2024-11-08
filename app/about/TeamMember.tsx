import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, description, imageUrl }) => {
  return (
    <div className="flex items-center space-x-4 bg-white shadow-md rounded-lg p-6 mb-6">
      <img
        src={imageUrl}
        alt={`${name}'s photo`}
        className="w-24 h-24 rounded-full object-cover shadow-lg"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
        <p className="text-lg text-blue-600">{role}</p>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TeamMember;
