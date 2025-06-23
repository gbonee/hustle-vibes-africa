
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo' | 'english';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  selectedPath: 'core' | 'pro';
  selectedLanguage?: Language | null;
  mode?: 'grid' | 'inline';
  size?: 'small' | 'large';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onLanguageSelect,
  selectedPath,
  selectedLanguage = null,
  mode = 'grid',
  size = 'large'
}) => {
  // For Pro path, prioritize English but still show other languages
  const languages = selectedPath === 'pro' ? [
    { id: 'english', name: 'English', flag: '🇬🇧' },
    { id: 'pidgin', name: 'Pidgin English', flag: '🇳🇬' },
    { id: 'yoruba', name: 'Yoruba', flag: '🧙‍♂️' },
    { id: 'hausa', name: 'Hausa', flag: '🌵' },
    { id: 'igbo', name: 'Igbo', flag: '🌟' },
  ] : [
    { id: 'pidgin', name: 'Pidgin English', flag: '🇳🇬' },
    { id: 'yoruba', name: 'Yoruba', flag: '🧙‍♂️' },
    { id: 'hausa', name: 'Hausa', flag: '🌵' },
    { id: 'igbo', name: 'Igbo', flag: '🌟' },
    { id: 'english', name: 'English', flag: '🇬🇧' },
  ];

  if (mode === 'inline') {
    return (
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <Button
            key={lang.id}
            onClick={() => onLanguageSelect(lang.id)}
            variant={selectedLanguage === lang.id ? "default" : "outline"}
            size="sm"
            className={`flex items-center gap-1 ${
              size === 'small' ? 'text-xs py-1 px-2 h-auto' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
            {selectedLanguage === lang.id && <Check className="w-3 h-3 ml-1" />}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Language</h2>
        <p className="text-gray-400">
          {selectedPath === 'pro' 
            ? 'Select the language for your AI learning journey' 
            : 'Select the language your AI coach will speak'
          }
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <Button
            key={lang.id}
            onClick={() => onLanguageSelect(lang.id)}
            className={`h-24 text-lg flex flex-col items-center justify-center transition-all ${
              selectedLanguage === lang.id 
                ? `${selectedPath === 'pro' ? 'bg-yellow-500 text-black' : 'bg-electric text-black'} border-2 border-white`
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
