
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onSelectLanguage: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onSelectLanguage 
}) => {
  const languages = [
    { id: 'pidgin', name: 'Pidgin English', flag: '🇳🇬' },
    { id: 'yoruba', name: 'Yoruba', flag: '🧙‍♂️' },
    { id: 'hausa', name: 'Hausa', flag: '🌵' },
    { id: 'igbo', name: 'Igbo', flag: '🌟' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Language</h2>
        <p className="text-gray-400">Select the language your AI coach will speak</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <Button
            key={lang.id}
            onClick={() => onSelectLanguage(lang.id as Language)}
            className={`h-24 text-lg flex flex-col items-center justify-center transition-all ${
              selectedLanguage === lang.id 
                ? 'bg-electric text-black border-2 border-white'
                : 'bg-black hover:bg-gray-900 border border-gray-700 text-white'
            }`}
          >
            <span className="text-2xl mb-1">{lang.flag}</span>
            <span>{lang.name}</span>
            {selectedLanguage === lang.id && (
              <Check className="absolute top-2 right-2 w-4 h-4" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
