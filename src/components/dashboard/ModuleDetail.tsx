
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Module } from './ModulesList';
import { Quiz } from '@/types/quiz';
import VideoPlayer from './VideoPlayer';
import QuizSection from './QuizSection';
import VideoUploader from './VideoUploader';

interface ModuleDetailProps {
  module: Module;
  quizzes: Quiz[];
  onClose: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, quizzes, onClose }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerIndex === quizzes[currentQuizIndex].answer) {
      setQuizResult('correct');
    } else {
      setQuizResult('incorrect');
    }
    
    setTimeout(() => {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(prevIndex => prevIndex + 1);
      } else {
        // End of quiz
        setShowQuiz(false);
        // Update progress (in a real app)
      }
      setQuizResult(null);
    }, 2000);
  };

  return (
    <Card className="bg-muted border-electric">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VideoPlayer module={module} />
        
        {showQuiz ? (
          <QuizSection 
            quiz={quizzes[currentQuizIndex]} 
            quizNumber={currentQuizIndex + 1} 
            totalQuizzes={quizzes.length} 
            onAnswerSelect={handleAnswerSelect} 
            result={quizResult}
          />
        ) : (
          <Button 
            onClick={handleStartQuiz} 
            className="w-full py-6 bg-electric text-black hover:bg-electric/90"
          >
            Take Quiz
          </Button>
        )}
        
        <VideoUploader moduleTitle={module.title} />
        
        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          Back to All Modules
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;
