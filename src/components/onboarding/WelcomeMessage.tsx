
import React from 'react';
import { Progress } from "@/components/ui/progress";

type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';
type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo';

interface AvatarInfo {
  id: Avatar;
  name: string;
  role: string;
  image: string;
  course: string;
  intro: {
    pidgin: string;
    yoruba: string;
    hausa: string;
    igbo: string;
  };
}

interface WelcomeMessageProps {
  selectedAvatar: AvatarInfo | null;
  language: Language | null;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  selectedAvatar, 
  language 
}) => {
  if (!selectedAvatar || !language) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
      <div className="bg-muted p-6 rounded-lg max-w-md border-2 border-electric animate-slide-up">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${selectedAvatar.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <h3 className="font-bold text-xl">{selectedAvatar.name}</h3>
        </div>
        <div className="bg-black p-4 rounded-lg border border-gray-800 mb-4">
          <p className="text-lg text-white">
            {selectedAvatar.intro[language]}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-300">Loading your dashboard...</p>
          <Progress value={100} className="h-2 mt-4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
