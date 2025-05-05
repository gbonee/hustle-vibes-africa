
import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module } from './ModulesList';
import { Quiz } from '@/types/quiz';
import VideoPlayer from './VideoPlayer';
import QuizSection from './QuizSection';
import VideoUploader from '../dashboard/VideoUploader';

interface ModuleDetailProps {
  module: Module;
  quizzes: Quiz[];
  onClose: () => void;
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
  language = 'pidgin',
  texts = { back: 'Back to All Modules', loading: 'Loading...' }
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleStartQuiz = useCallback(() => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizResult(null);
  }, []);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (quizzes && quizzes.length > 0) {
      if (answerIndex === quizzes[currentQuizIndex].answer) {
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
          setTimeout(() => {
            setShowQuiz(false);
            // Update progress (in a real app)
          }, 1500);
        }
      }, 2000);
    }
  }, [currentQuizIndex, quizzes]);

  // Check if there are quizzes available for this module
  const hasQuizzes = quizzes && quizzes.length > 0;

  // Get quiz button text based on language
  const getQuizButtonText = () => {
    const baseText = {
      'pidgin': 'Take Quiz on',
      'yoruba': 'Ṣe Idanwo lori',
      'hausa': 'Yi Gwaji akan',
      'igbo': 'Were Quiz na',
    };
    
    const selected = (baseText as any)[language] || baseText.pidgin;
    return `${selected} ${module.title}`;
  };

  // Get no quiz text based on language
  const getNoQuizText = () => {
    const texts = {
      'pidgin': 'No quiz available for dis module yet.',
      'yoruba': 'Ko si idanwo ti o wa fun modulu yii sibẹsibẹ.',
      'hausa': 'Babu gwaji mai samuwa don wannan module har yanzu.',
      'igbo': 'O nweghị quiz dị maka module a ugbua.',
    };
    
    return (texts as any)[language] || texts.pidgin;
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
              className="w-full py-6 bg-electric text-black hover:bg-electric/90"
            >
              {getQuizButtonText()}
            </Button>
          ) : (
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <p>{getNoQuizText()}</p>
            </div>
          )
        )}
        
        <VideoUploader moduleTitle={module.title} />
        
        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          {texts.back || 'Back to All Modules'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;
