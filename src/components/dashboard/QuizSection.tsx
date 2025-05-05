
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { Quiz } from '@/types/quiz';

interface QuizSectionProps {
  quiz: Quiz;
  quizNumber: number;
  totalQuizzes: number;
  onAnswerSelect: (answerIndex: number) => void;
  result: 'correct' | 'incorrect' | null;
  moduleTopic?: string;
}

const QuizSection: React.FC<QuizSectionProps> = React.memo(({ 
  quiz, 
  quizNumber, 
  totalQuizzes, 
  onAnswerSelect, 
  result,
  moduleTopic 
}) => {
  return (
    <div className="bg-black p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Quick Quiz: {moduleTopic}</h3>
      <p className="text-gray-400 mb-4">Question {quizNumber} of {totalQuizzes}</p>
      
      <div className="mb-6">
        <h4 className="text-lg mb-4">{quiz.question}</h4>
        <div className="space-y-2">
          {quiz.options.map((option, index) => (
            <Button 
              key={index}
              onClick={() => onAnswerSelect(index)}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4"
              disabled={result !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      {result && (
        <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
          result === 'correct' 
            ? 'bg-green-900/30 border border-green-500/30' 
            : 'bg-red-900/30 border border-red-500/30'
        }`}>
          {result === 'correct' ? (
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
  );
});

QuizSection.displayName = 'QuizSection';

export default QuizSection;
