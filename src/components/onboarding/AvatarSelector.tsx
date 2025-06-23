
import React from 'react';
import { Check } from "lucide-react";
import { avatars } from './AvatarData';

type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';

interface AvatarSelectorProps {
  onAvatarSelect: (avatar: string) => void;
  selectedLanguage: string;
  selectedPath: 'core' | 'pro';
  selectedAvatar?: Avatar | null;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  onAvatarSelect,
  selectedLanguage,
  selectedPath,
  selectedAvatar = null
}) => {
  // Filter avatars based on path - for now, show all avatars for both paths
  const availableAvatars = avatars;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your AI Coach</h2>
        <p className="text-gray-400">
          {selectedPath === 'pro' 
            ? 'Select your AI mentor for building tech solutions'
            : 'Select who will guide you through your learning journey'
          }
        </p>
      </div>
      
      <div className="space-y-4">
        {availableAvatars.map((av) => (
          <div 
            key={av.id}
            onClick={() => onAvatarSelect(av.id)}
            className={`avatar-card p-4 cursor-pointer transition-all ${
              selectedAvatar === av.id ? 
                `border-4 ${selectedPath === 'pro' ? 'border-yellow-400' : 'border-electric'} animate-pulse-glow` : 
                'border border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full overflow-hidden bg-gray-800"
                style={{
                  backgroundImage: `url(${av.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{av.name}</h3>
                <p className="text-sm text-gray-400">{av.role}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLanguage && av.intro[selectedLanguage as keyof typeof av.intro] 
                    ? av.intro[selectedLanguage as keyof typeof av.intro].substring(0, 60) + '...'
                    : av.intro.pidgin.substring(0, 60) + '...'
                  }
                </p>
              </div>
              {selectedAvatar === av.id && (
                <Check className={`w-6 h-6 ${selectedPath === 'pro' ? 'text-yellow-400' : 'text-electric'}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
