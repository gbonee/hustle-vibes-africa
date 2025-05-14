
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Award, ArrowRight } from "lucide-react";
import { getQuickActionButtonText } from '../chatTranslations';

interface QuickActionButtonsProps {
  currentLanguage: string;
  onActionSelect: (action: string) => void;
  isMobile: boolean;
}

const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({ 
  currentLanguage, 
  onActionSelect,
  isMobile
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full mt-1">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('next-lesson')}
        className="flex flex-col h-auto py-2 items-center justify-center"
      >
        <BookOpen className="h-3.5 w-3.5 mb-1" />
        <span className={`${isMobile ? "text-[9px]" : "text-xs"} text-center leading-tight`}>
          {getQuickActionButtonText('next-lesson', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('take-quiz')}
        className="flex flex-col h-auto py-2 items-center justify-center"
      >
        <Award className="h-3.5 w-3.5 mb-1" />
        <span className={`${isMobile ? "text-[9px]" : "text-xs"} text-center leading-tight`}>
          {getQuickActionButtonText('take-quiz', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('challenge')}
        className="flex flex-col h-auto py-2 items-center justify-center"
      >
        <ArrowRight className="h-3.5 w-3.5 mb-1" />
        <span className={`${isMobile ? "text-[9px]" : "text-xs"} text-center leading-tight`}>
          {getQuickActionButtonText('challenge', currentLanguage)}
        </span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
