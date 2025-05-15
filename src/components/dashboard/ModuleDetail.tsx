
import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module } from './ModulesList';
import { Quiz } from '@/types/quiz';
import VideoPlayer from './VideoPlayer';
import QuizSection from './QuizSection';
import VideoUploader from '../dashboard/VideoUploader';
import { useIsMobile } from '@/hooks/use-mobile';

interface ModuleDetailProps {
  module: Module;
  quizzes: Quiz[];
  onClose: () => void;
  onModuleComplete?: () => void;
  onQuizComplete?: (correct: boolean) => void;
  language?: string;
  texts?: {
    back?: string;
    loading?: string;
  };
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ 
  module, 
  quizzes, 
  onClose,
  onModuleComplete,
  onQuizComplete,
  language = 'pidgin',
  texts = { back: 'Back to All Modules', loading: 'Loading...' }
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const isMobile = useIsMobile();

  const handleStartQuiz = useCallback(() => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizResult(null);
    setQuizCompleted(false);
  }, []);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (quizzes && quizzes.length > 0) {
      const isCorrect = answerIndex === quizzes[currentQuizIndex].answer;
      
      if (isCorrect) {
        setQuizResult('correct');
      } else {
        setQuizResult('incorrect');
      }
      
      setTimeout(() => {
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(prevIndex => prevIndex + 1);
          setQuizResult(null);
        } else {
          // End of quiz
          setQuizCompleted(true);
          
          // Call onQuizComplete callback with result
          if (onQuizComplete) {
            onQuizComplete(isCorrect);
          }
          
          // Mark module as completed
          if (isCorrect && onModuleComplete) {
            onModuleComplete();
          }
          
          setTimeout(() => {
            setShowQuiz(false);
          }, 1500);
        }
      }, 2000);
    }
  }, [currentQuizIndex, quizzes, onQuizComplete, onModuleComplete]);

  // Check if there are quizzes available for this module
  const hasQuizzes = quizzes && quizzes.length > 0;

  // Get quiz button text based on language
  const getQuizButtonText = () => {
    const baseText = {
      'pidgin': isMobile ? 'Take Quiz' : 'Take Quiz on',
      'yoruba': isMobile ? 'Ṣe Idanwo' : 'Ṣe Idanwo lori',
      'hausa': isMobile ? 'Yi Gwaji' : 'Yi Gwaji akan',
      'igbo': isMobile ? 'Were Quiz' : 'Were Quiz na',
    };
    
    const selected = (baseText as any)[language] || baseText.pidgin;
    
    if (isMobile) {
      return selected;
    }
    return `${selected} ${module.title}`;
  };

  // Get no quiz text based on language
  const getNoQuizText = () => {
    const texts = {
      'pidgin': isMobile ? 'No quiz yet' : 'No quiz available for dis module yet.',
      'yoruba': isMobile ? 'Ko si idanwo' : 'Ko si idanwo ti o wa fun modulu yii sibẹsibẹ.',
      'hausa': isMobile ? 'Babu gwaji' : 'Babu gwaji mai samuwa don wannan module har yanzu.',
      'igbo': isMobile ? 'O nweghị quiz' : 'O nweghị quiz dị maka module a ugbua.',
    };
    
    return (texts as any)[language] || texts.pidgin;
  };
  
  // Handle manual module completion
  const handleMarkAsComplete = () => {
    if (onModuleComplete) {
      onModuleComplete();
    }
  };

  // Get mark as complete text based on language
  const getMarkAsCompleteText = () => {
    const texts = {
      'pidgin': 'Mark as Complete',
      'yoruba': 'Fi àmì sí bí Àṣẹṣẹ́',
      'hausa': 'Yi Alamar Cika',
      'igbo': 'Makị dịka Emezuru',
    };
    
    return (texts as any)[language] || texts.pidgin;
  };
  
  // Get button text for back button
  const getBackButtonText = () => {
    if (texts.back) return texts.back;
    
    const backTexts = {
      'pidgin': 'Back to All Modules',
      'yoruba': 'Pada si Gbogbo Modulu',
      'hausa': 'Koma Zuwa Duk Modules',
      'igbo': 'Laghachi na Modules Nile',
    };
    
    return (backTexts as any)[language] || backTexts.pidgin;
  };

  return (
    <Card className="bg-muted border-electric">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VideoPlayer module={module} />
        
        {showQuiz && hasQuizzes ? (
          <QuizSection 
            quiz={quizzes[currentQuizIndex]} 
            quizNumber={currentQuizIndex + 1} 
            totalQuizzes={quizzes.length} 
            onAnswerSelect={handleAnswerSelect} 
            result={quizResult}
            moduleTopic={module.title}
            language={language}
          />
        ) : (
          hasQuizzes ? (
            <Button 
              onClick={handleStartQuiz} 
              className="w-full py-4 sm:py-6 bg-electric text-black hover:bg-electric/90"
            >
              {getQuizButtonText()}
            </Button>
          ) : (
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <p>{getNoQuizText()}</p>
              <Button 
                onClick={handleMarkAsComplete}
                className="mt-4 bg-electric text-black hover:bg-electric/90"
              >
                {getMarkAsCompleteText()}
              </Button>
            </div>
          )
        )}
        
        <VideoUploader moduleTitle={module.title} />
        
        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          {getBackButtonText()}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;
