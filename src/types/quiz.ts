
export interface Quiz {
  question: string;
  options: string[];
  answer: number;
  moduleId?: number; // To associate the quiz with a module
  moduleTopic?: string; // To identify which module topic this quiz belongs to
  difficulty?: 'easy' | 'medium' | 'hard'; // To categorize quizzes by difficulty
  explanation?: string; // To provide an explanation for the correct answer
}
