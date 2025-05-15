
import React from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

interface NoQuizMessageProps {
  onMarkComplete: () => void;
  language?: string;
}

const NoQuizMessage: React.FC<NoQuizMessageProps> = ({ onMarkComplete, language = 'pidgin' }) => {
  const isMobile = useIsMobile();
  
  // Get no quiz text based on language
  const getNoQuizText = () => {
    const texts = {
      'pidgin': isMobile ? 'No quiz yet' : 'No quiz available for dis module yet.',
      'yoruba': isMobile ? 'Ko si idanwo' : 'Ko si idanwo ti o wa fun modulu yii sibẹsibẹ.',
      'hausa': isMobile ? 'Babu gwaji' : 'Babu gwaji mai samuwa don wannan module har yanzu.',
      'igbo': isMobile ? 'O nweghị quiz' : 'O nweghị quiz dị maka module a ugbua.',
      'english': isMobile ? 'No quiz yet' : 'No quiz is available for this module yet.',
    };
    
    return (texts as any)[language] || texts.pidgin;
  };

  // Get mark as complete text based on language
  const getMarkAsCompleteText = () => {
    const texts = {
      'pidgin': 'Mark as Complete',
      'yoruba': 'Fi àmì sí bí Àṣẹṣẹ́',
      'hausa': 'Yi Alamar Cika',
      'igbo': 'Makị dịka Emezuru',
      'english': 'Mark as Complete',
    };
    
    return (texts as any)[language] || texts.pidgin;
  };
  
  return (
    <div className="p-4 bg-gray-800 rounded-lg text-center">
      <p>{getNoQuizText()}</p>
      <Button 
        onClick={onMarkComplete}
        className="mt-4 bg-electric text-black hover:bg-electric/90"
      >
        {getMarkAsCompleteText()}
      </Button>
    </div>
  );
};

export default NoQuizMessage;
