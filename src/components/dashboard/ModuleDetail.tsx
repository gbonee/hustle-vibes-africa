
import React, { useState, useCallback } from 'react';
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
          />
        ) : (
          hasQuizzes ? (
            <Button 
              onClick={handleStartQuiz} 
              className="w-full py-6 bg-electric text-black hover:bg-electric/90"
            >
              Take Quiz on {module.title}
            </Button>
          ) : (
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <p>No quiz available for this module yet.</p>
            </div>
          )
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
