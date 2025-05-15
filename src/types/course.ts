
import { Module } from '@/components/dashboard/ModulesList';
import { Quiz } from '@/types/quiz';

export interface Course {
  id: string;
  title: string;
  description: string; // Added description field
  avatar: string;
  modules: Module[];
  translations: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    };
  };
}

export interface QuizzesByModule {
  [moduleId: number]: Quiz[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}
