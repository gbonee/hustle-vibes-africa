
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizButtonProps {
  onClick: () => void;
  moduleTopic: string;
  language?: string;
}

const QuizButton: React.FC<QuizButtonProps> = ({ onClick, moduleTopic, language = 'pidgin' }) => {
  const isMobile = useIsMobile();
  
  // Get quiz button text based on language
  const getQuizButtonText = () => {
    const baseText = {
      'pidgin': isMobile ? 'Take Quiz' : 'Take Quiz on',
      'yoruba': isMobile ? 'Ṣe Idanwo' : 'Ṣe Idanwo lori',
      'hausa': isMobile ? 'Yi Gwaji' : 'Yi Gwaji akan',
      'igbo': isMobile ? 'Were Quiz' : 'Were Quiz na',
      'english': isMobile ? 'Take Quiz' : 'Take Quiz on',
    };
    
    const selected = (baseText as any)[language] || baseText.pidgin;
    
    if (isMobile) {
      return selected;
    }
    return `${selected} ${moduleTopic}`;
  };

  return (
    <Button 
      onClick={onClick} 
      className="w-full py-4 sm:py-6 bg-electric text-black hover:bg-electric/90"
    >
      {getQuizButtonText()}
    </Button>
  );
};

export default QuizButton;
