
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Award, ArrowRight } from "lucide-react";
import { getLanguageSpecificAction } from '../chatTranslations';

interface QuickActionButtonsProps {
  currentLanguage: string;
  onActionSelect: (action: string) => void;
  isMobile: boolean;
}

// Get translated action button labels
const getQuickActionButtonText = (actionType: string, language: string): string => {
  const translations = {
    'next-lesson': {
      pidgin: 'Next Lesson',
      yoruba: 'Ẹ̀kọ́ Tókàn',
      hausa: 'Darasin Gaba',
      igbo: 'Ihe Ọmụmụ Ozugbo',
    },
    'take-quiz': {
      pidgin: 'Take Quiz',
      yoruba: 'Ṣe Idánwò',
      hausa: 'Yi Gwaji',
      igbo: 'Were Quiz',
    },
    'challenge': {
      pidgin: 'Challenge',
      yoruba: 'Ìdánwò',
      hausa: 'Kalubale',
      igbo: 'Ịma Aka',
    },
  };
  
  return translations[actionType]?.[language] || translations[actionType]?.pidgin || actionType;
};

const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  currentLanguage,
  onActionSelect,
  isMobile
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('next-lesson')}
        className="flex items-center justify-center h-8 px-2"
      >
        <BookOpen className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[9px]" : "text-xs"}>
          {getQuickActionButtonText('next-lesson', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('take-quiz')}
        className="flex items-center justify-center h-8 px-2"
      >
        <Award className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[9px]" : "text-xs"}>
          {getQuickActionButtonText('take-quiz', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('challenge')}
        className="flex items-center justify-center h-8 px-2"
      >
        <ArrowRight className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[9px]" : "text-xs"}>
          {getQuickActionButtonText('challenge', currentLanguage)}
        </span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
