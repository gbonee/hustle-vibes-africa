
import React, { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Module } from './ModulesList';
import { Quiz } from '@/types/quiz';
import VideoPlayer from './VideoPlayer';
import QuizSection from './QuizSection';
import VideoUploader from './VideoUploader';
import ModuleHeader from './module-detail/ModuleHeader';
import QuizButton from './module-detail/QuizButton';
import NoQuizMessage from './module-detail/NoQuizMessage';
import BackButton from './module-detail/BackButton';
import { getBackButtonText } from '@/utils/moduleDetailTranslations';

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
  
  // Handle manual module completion
  const handleMarkAsComplete = () => {
    if (onModuleComplete) {
      onModuleComplete();
    }
  };

  // Get button text for back button
  const backButtonText = getBackButtonText(language, texts.back);

  return (
    <Card className="bg-muted border-electric">
      <ModuleHeader title={module.title} />
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
            <QuizButton 
              onClick={handleStartQuiz} 
              moduleTopic={module.title}
              language={language}
            />
          ) : (
            <NoQuizMessage 
              onMarkComplete={handleMarkAsComplete}
              language={language}
            />
          )
        )}
        
        <VideoUploader moduleTitle={module.title} />
        
        <BackButton 
          onClick={onClose}
          text={backButtonText}
        />
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;
