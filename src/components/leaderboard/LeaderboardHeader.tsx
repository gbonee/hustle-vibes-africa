
import React from 'react';

interface LeaderboardHeaderProps {
  title: string;
}

const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ title }) => {
  return <h1 className="text-3xl font-bold mb-6">{title}</h1>;
};

export default LeaderboardHeader;
