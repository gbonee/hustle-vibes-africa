
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

  // Get localized text based on selected language (show English by default until selection)
  const getText = () => {
    const texts = {
      heading: {
        pidgin: 'Choose Your Language',
        yoruba: 'Yan Èdè Rẹ',
        hausa: 'Zaɓi Yarenku',
        igbo: 'Họrọ Asụsụ Gị',
      },
      subheading: {
        pidgin: 'Select the language your AI coach will speak',
        yoruba: 'Yan èdè tí olùkọ́ AI rẹ yóò sọ',
        hausa: 'Zaɓi harshen da malamin AI ɗinka zai yi magana',
        igbo: 'Họrọ asụsụ nke onye nkuzi AI gị ga-asụ',
      }
    };
    
    if (!selectedLanguage) return { heading: texts.heading.pidgin, subheading: texts.subheading.pidgin };
    
    return {
      heading: (texts.heading as any)[selectedLanguage] || texts.heading.pidgin,
      subheading: (texts.subheading as any)[selectedLanguage] || texts.subheading.pidgin,
    };
  };
  
  const localizedText = getText();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{localizedText.heading}</h2>
        <p className="text-gray-400">{localizedText.subheading}</p>
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
