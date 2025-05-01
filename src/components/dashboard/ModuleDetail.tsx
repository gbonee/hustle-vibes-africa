
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, CircleCheck, CircleX } from "lucide-react";
import { Module } from './ModulesList';

interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

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
        {module.hasVideo ? (
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
            {/* In a real app this would be a video player */}
            <div className="text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-electric" />
              <p className="text-gray-400">Video would play here</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Module Content</h3>
              <p className="text-gray-400">This module contains reading materials and exercises.</p>
            </div>
          </div>
        )}
        
        {showQuiz ? (
          <div className="bg-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
            <p className="text-gray-400 mb-4">Question {currentQuizIndex + 1} of {quizzes.length}</p>
            
            <div className="mb-6">
              <h4 className="text-lg mb-4">{quizzes[currentQuizIndex].question}</h4>
              <div className="space-y-2">
                {quizzes[currentQuizIndex].options.map((option, index) => (
                  <Button 
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    disabled={quizResult !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            {quizResult && (
              <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
                quizResult === 'correct' 
                  ? 'bg-green-900/30 border border-green-500/30' 
                  : 'bg-red-900/30 border border-red-500/30'
              }`}>
                {quizResult === 'correct' ? (
                  <>
                    <CircleCheck className="text-green-400 h-5 w-5" />
                    <p>You sabi die! You go make money pass Dangote o!</p>
                  </>
                ) : (
                  <>
                    <CircleX className="text-red-400 h-5 w-5" />
                    <p>Ah, who dash you brain today? Oya try again jare!</p>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Button 
            onClick={handleStartQuiz} 
            className="w-full py-6 bg-electric text-black hover:bg-electric/90"
          >
            Take Quiz
          </Button>
        )}
        
        <div>
          <h3 className="text-lg font-bold mb-2">Mini-Challenge</h3>
          <div className="bg-black p-4 rounded-lg border border-gray-800">
            <p>Post your practice video and tag @UsabiAI to win 500MB data!</p>
            <Button 
              className="mt-4"
              variant="outline"
            >
              Submit Challenge
            </Button>
          </div>
        </div>
        
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
