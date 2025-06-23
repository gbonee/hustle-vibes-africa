
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { avatars } from './AvatarData';

type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';
type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo' | 'english';

interface WelcomeMessageProps {
  selectedLanguage: string;
  selectedAvatar: string;
  selectedPath: 'core' | 'pro';
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  selectedAvatar, 
  selectedLanguage,
  selectedPath
}) => {
  // Find the correct avatar data from our central avatar database
  const avatarData = avatars.find(avatar => avatar.id === selectedAvatar as Avatar);
  
  if (!avatarData || !selectedLanguage) return null;

  // Use the intro from our avatar data, fallback to pidgin if language not available
  const introMessage = avatarData.intro[selectedLanguage as Language] || avatarData.intro.pidgin;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome to USABI!</h2>
        <p className="text-gray-400">
          {selectedPath === 'pro' 
            ? 'Get ready to build AI solutions and earn globally'
            : 'Get ready to start your local hustle journey'
          }
        </p>
      </div>

      <div className="bg-black/50 p-6 rounded-lg border border-gray-800">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${avatarData.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div>
            <h3 className="font-bold text-xl">{avatarData.name}</h3>
            <p className="text-gray-400">{avatarData.role}</p>
          </div>
        </div>
        
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
          <p className="text-lg text-white leading-relaxed">
            {introMessage}
          </p>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-300 mb-2">
            {selectedPath === 'pro' 
              ? 'Setting up your AI learning environment...'
              : 'Setting up your personalized learning experience...'
            }
          </p>
          <Progress value={100} className="h-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
