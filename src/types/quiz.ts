
export interface Quiz {
  question: string;
  options: string[];
  answer: number;
  moduleId: number;
  moduleTopic?: string;
  translations?: {
    [language: string]: {
      question: string;
      options: string[];
    };
  };
}
