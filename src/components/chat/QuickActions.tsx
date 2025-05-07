
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Award, ArrowRight } from "lucide-react";
import { getQuickActionButtonText } from '@/utils/chatTranslations';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
  currentLanguage: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, currentLanguage }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionClick('next-lesson')}
        className="flex items-center justify-center"
      >
        <BookOpen className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>
          {getQuickActionButtonText('next-lesson', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionClick('take-quiz')}
        className="flex items-center justify-center"
      >
        <Award className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>
          {getQuickActionButtonText('take-quiz', currentLanguage)}
        </span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onActionClick('challenge')}
        className="flex items-center justify-center"
      >
        <ArrowRight className="h-4 w-4 mr-1" />
        <span className={isMobile ? "text-[10px]" : "text-xs"}>
          {getQuickActionButtonText('challenge', currentLanguage)}
        </span>
      </Button>
    </div>
  );
};

export default QuickActions;
