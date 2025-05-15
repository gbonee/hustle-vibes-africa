
import React from 'react';
import AIChat from './chat/AIChat';

// This is now just a re-export wrapper for backward compatibility
const AIChatWrapper: React.FC<{
  courseAvatar: string;
  userName: string;
}> = ({ courseAvatar, userName }) => {
  return <AIChat courseAvatar={courseAvatar} userName={userName} />;
};

export default AIChatWrapper;
