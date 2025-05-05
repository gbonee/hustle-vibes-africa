
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
  language?: string;
}

const QuizSection: React.FC<QuizSectionProps> = React.memo(({ 
  quiz, 
  quizNumber, 
  totalQuizzes, 
  onAnswerSelect, 
  result,
  moduleTopic,
  language = 'pidgin'
}) => {
  // Get language-specific text
  const getText = () => {
    const texts = {
      heading: {
        pidgin: 'Quick Quiz:',
        yoruba: 'Idanwo Kiakia:',
        hausa: 'Gaggawar Gwaji:',
        igbo: 'Quiz Ngwa ngwa:',
      },
      questionPrefix: {
        pidgin: 'Question',
        yoruba: 'Ibeere',
        hausa: 'Tambaya',
        igbo: 'Ajụjụ',
      },
      of: {
        pidgin: 'of',
        yoruba: 'ti',
        hausa: 'na',
        igbo: 'nke',
      },
      correctAnswer: {
        pidgin: 'You sabi die! You go make money pass Dangote o!',
        yoruba: 'O mọ̀ dáradára! Ìwọ yóò ṣe owó ju Dangote lọ!',
        hausa: 'Ka sani sosai! Za ka iya samun kudi fiye da Dangote!',
        igbo: 'Ịmatala nke ọma! Ị ga-emenweta ego karịa Dangote o!',
      },
      wrongAnswer: {
        pidgin: 'Ah, who dash you brain today? Oya try again jare!',
        yoruba: 'Ah, tani fun ọ ni ọpọlọ loni? Oya gbiyanju lẹẹkansi!',
        hausa: 'Ah, wa ya baka kwakwalwa yau? Kawai sake gwadawa!',
        igbo: 'Ah, onye nyere gị uche taa? Ngwa gbalịa ọzọ!',
      },
      earnedPoints: {
        pidgin: 'You don earn 50 points!',
        yoruba: 'O ti gba 50 ọrọ́!',
        hausa: 'Ka sami 50 kyauta!',
        igbo: 'Ị nwetala 50 ọtụtụ!',
      }
    };
    
    return {
      heading: (texts.heading as any)[language] || texts.heading.pidgin,
      questionPrefix: (texts.questionPrefix as any)[language] || texts.questionPrefix.pidgin,
      of: (texts.of as any)[language] || texts.of.pidgin,
      correctAnswer: (texts.correctAnswer as any)[language] || texts.correctAnswer.pidgin,
      wrongAnswer: (texts.wrongAnswer as any)[language] || texts.wrongAnswer.pidgin,
      earnedPoints: (texts.earnedPoints as any)[language] || texts.earnedPoints.pidgin,
    };
  };
  
  const localizedText = getText();
  
  return (
    <div className="bg-black p-6 rounded-lg border border-gray-800">
      <h3 className="text-xl font-bold mb-4">{localizedText.heading} {moduleTopic || 'Module Knowledge'}</h3>
      <p className="text-gray-400 mb-4">{localizedText.questionPrefix} {quizNumber} {localizedText.of} {totalQuizzes}</p>
      
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
        <div className={`p-4 rounded-lg mb-4 flex flex-col gap-2 ${
          result === 'correct' 
            ? 'bg-green-900/30 border border-green-500/30' 
            : 'bg-red-900/30 border border-red-500/30'
        }`}>
          <div className="flex items-center gap-2">
            {result === 'correct' ? (
              <>
                <CircleCheck className="text-green-400 h-5 w-5" />
                <p>{localizedText.correctAnswer}</p>
              </>
            ) : (
              <>
                <CircleX className="text-red-400 h-5 w-5" />
                <p>{localizedText.wrongAnswer}</p>
              </>
            )}
          </div>
          
          {result === 'correct' && (
            <div className="flex items-center gap-2 text-sm text-electric mt-2">
              <div className="bg-electric/20 px-2 py-1 rounded-full">
                +50 points
              </div>
              <p>{localizedText.earnedPoints}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

QuizSection.displayName = 'QuizSection';

export default QuizSection;
