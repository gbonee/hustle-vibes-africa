
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Award, ArrowRight } from "lucide-react";
import { getLanguageSpecificAction, getQuickActionButtonText } from '../chatTranslations';

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
    <div className="flex flex-wrap gap-2 mb-1">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('next-lesson')}
        className="flex items-center justify-center h-6 px-2"
      >
        <BookOpen className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[8px]" : "text-xs"}>
          {getQuickActionButtonText('next-lesson', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('take-quiz')}
        className="flex items-center justify-center h-6 px-2"
      >
        <Award className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[8px]" : "text-xs"}>
          {getQuickActionButtonText('take-quiz', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('challenge')}
        className="flex items-center justify-center h-6 px-2"
      >
        <ArrowRight className="h-3 w-3 mr-1" />
        <span className={isMobile ? "text-[8px]" : "text-xs"}>
          {getQuickActionButtonText('challenge', currentLanguage)}
        </span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
