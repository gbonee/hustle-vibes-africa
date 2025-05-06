
import React from 'react';
import { Check } from "lucide-react";

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

interface AvatarSelectorProps {
  avatars: AvatarInfo[];
  selectedAvatar: Avatar | null;
  onSelectAvatar: (avatar: Avatar) => void;
  language?: Language;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ 
  avatars, 
  selectedAvatar, 
  onSelectAvatar,
  language = 'pidgin'
}) => {
  // Get translations based on selected language
  const getLocalizedText = () => {
    const texts = {
      heading: {
        pidgin: 'Choose Your AI Coach',
        yoruba: 'Yan Olùkọ́ AI Rẹ',
        hausa: 'Zaɓi Malamin AI Naka',
        igbo: 'Họrọ Onye Nkuzi AI Gị',
      },
      subheading: {
        pidgin: 'Select who will guide you through your learning journey',
        yoruba: 'Yan ẹniti yoo ṣe itọsọna rẹ ni gbogbo irin ajo ẹkọ rẹ',
        hausa: 'Zaɓi wanda zai jagorance ka yayin tafiyar koyon ka',
        igbo: 'Họrọ onye ga-edu gị n\'ụzọ nke mmụta gị',
      }
    };
    
    return {
      heading: (texts.heading as any)[language] || texts.heading.pidgin,
      subheading: (texts.subheading as any)[language] || texts.subheading.pidgin,
    };
  };
  
  const localizedText = getLocalizedText();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{localizedText.heading}</h2>
        <p className="text-gray-400">{localizedText.subheading}</p>
      </div>
      
      <div className="space-y-4">
        {avatars.map((av) => (
          <div 
            key={av.id}
            onClick={() => onSelectAvatar(av.id)}
            className={`avatar-card p-4 cursor-pointer transition-all ${
              selectedAvatar === av.id ? 'border-4 border-electric animate-pulse-glow' : ''
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
              <div>
                <h3 className="font-bold text-lg">{av.name}</h3>
                <p className="text-sm text-gray-400">{av.role}</p>
              </div>
              {selectedAvatar === av.id && (
                <Check className="ml-auto text-electric w-6 h-6" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
