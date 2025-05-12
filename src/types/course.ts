
import { Module } from '@/components/dashboard/ModulesList';

export interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
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
