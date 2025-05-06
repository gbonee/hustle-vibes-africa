
import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { Quiz } from '@/types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
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
        pidgin: isMobile ? 'Correct! 🔥' : 'You sabi die! You go make money pass Dangote o!',
        yoruba: isMobile ? 'O dara! 🔥' : 'O mọ̀ dáradára! Ìwọ yóò ṣe owó ju Dangote lọ!',
        hausa: isMobile ? 'Daidai! 🔥' : 'Ka sani sosai! Za ka iya samun kudi fiye da Dangote!',
        igbo: isMobile ? 'O ziri ezi! 🔥' : 'Ịmatala nke ọma! Ị ga-emenweta ego karịa Dangote o!',
      },
      wrongAnswer: {
        pidgin: isMobile ? 'Try again! 😬' : 'Ah, who dash you brain today? Oya try again jare!',
        yoruba: isMobile ? 'Gbiyanju lẹẹkansi! 😬' : 'Ah, tani fun ọ ni ọpọlọ loni? Oya gbiyanju lẹẹkansi!',
        hausa: isMobile ? 'Sake gwadawa! 😬' : 'Ah, wa ya baka kwakwalwa yau? Kawai sake gwadawa!',
        igbo: isMobile ? 'Gbalịa ọzọ! 😬' : 'Ah, onye nyere gị uche taa? Ngwa gbalịa ọzọ!',
      },
      earnedPoints: {
        pidgin: isMobile ? '+50 points!' : 'You don earn 50 points!',
        yoruba: isMobile ? '+50 ọrọ́!' : 'O ti gba 50 ọrọ́!',
        hausa: isMobile ? '+50 kyauta!' : 'Ka sami 50 kyauta!',
        igbo: isMobile ? '+50 ọtụtụ!' : 'Ị nwetala 50 ọtụtụ!',
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

  // Get shortened module topic for mobile display
  const getShortenedTopic = (topic?: string) => {
    if (!topic || !isMobile) return topic || 'Module Knowledge';
    
    // Shorten specific module topics for mobile
    if (topic.includes('Intro to Digital Marketing')) {
      return 'Digital Marketing Intro';
    }
    if (topic.length > 25) {
      return `${topic.substring(0, 22)}...`;
    }
    return topic;
  };
  
  return (
    <div className="bg-black p-4 sm:p-6 rounded-lg border border-gray-800">
      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
        {localizedText.heading} {getShortenedTopic(moduleTopic)}
      </h3>
      <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
        {localizedText.questionPrefix} {quizNumber} {localizedText.of} {totalQuizzes}
      </p>
      
      <div className="mb-4 sm:mb-6">
        <h4 className="text-base sm:text-lg mb-3 sm:mb-4">{quiz.question}</h4>
        <div className="space-y-1 sm:space-y-2">
          {quiz.options.map((option, index) => (
            <Button 
              key={index}
              onClick={() => onAnswerSelect(index)}
              variant="outline"
              className="w-full justify-start text-left h-auto py-2 sm:py-3 px-3 sm:px-4 text-sm"
              disabled={result !== null}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      {result && (
        <div className={`p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 flex flex-col gap-1 sm:gap-2 ${
          result === 'correct' 
            ? 'bg-green-900/30 border border-green-500/30' 
            : 'bg-red-900/30 border border-red-500/30'
        }`}>
          <div className="flex items-center gap-2">
            {result === 'correct' ? (
              <>
                <CircleCheck className="text-green-400 h-4 w-4" />
                <p className="text-sm sm:text-base">{localizedText.correctAnswer}</p>
              </>
            ) : (
              <>
                <CircleX className="text-red-400 h-4 w-4" />
                <p className="text-sm sm:text-base">{localizedText.wrongAnswer}</p>
              </>
            )}
          </div>
          
          {result === 'correct' && (
            <div className="flex items-center gap-2 text-xs sm:text-sm text-electric mt-1 sm:mt-2">
              <div className="bg-electric/20 px-2 py-1 rounded-full">
                +50
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
