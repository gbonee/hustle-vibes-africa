
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
    <div className="grid grid-cols-3 gap-2 w-full">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('next-lesson')}
        className="flex items-center justify-center"
      >
        <BookOpen className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('next-lesson', currentLanguage)}</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('take-quiz')}
        className="flex items-center justify-center"
      >
        <Award className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('take-quiz', currentLanguage)}</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionSelect('challenge')}
        className="flex items-center justify-center"
      >
        <ArrowRight className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('challenge', currentLanguage)}</span>
      </Button>
    </div>
  );
};

export default QuickActionButtons;
