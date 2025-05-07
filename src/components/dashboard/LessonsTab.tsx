
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ModulesList, { Module } from './ModulesList';
import ModuleDetail from './ModuleDetail';
import { Quiz } from '@/types/quiz';

interface LessonsTabProps {
  modules: Module[];
  completedModuleIds: number[];
  courseTranslations?: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    };
  };
  currentLanguage: string;
  isPreviewMode: boolean;
  texts: {
    back: string;
    loading: string;
    yourModules: string;
  };
  getTranslatedQuizzes: (moduleId: number) => Quiz[];
  onModuleComplete: (moduleId: number) => void;
  onQuizComplete: (moduleId: number, correct: boolean) => void;
}

const LessonsTab: React.FC<LessonsTabProps> = ({ 
  modules, 
  completedModuleIds,
  courseTranslations,
  currentLanguage,
  isPreviewMode,
  texts,
  getTranslatedQuizzes,
  onModuleComplete,
  onQuizComplete
}) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleGoBack = () => {
    setSelectedModule(null);
  };

  const handleModuleCompletion = () => {
    if (selectedModule) {
      onModuleComplete(selectedModule.id);
    }
  };

  const handleQuizCompletion = (correct: boolean) => {
    if (selectedModule) {
      onQuizComplete(selectedModule.id, correct);
    }
  };

  return (
    <>
      {selectedModule ? (
        <>
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="mb-4"
            size="sm"
          >
            ← {texts.back}
          </Button>
          
          <ModuleDetail 
            module={selectedModule}
            quizzes={getTranslatedQuizzes(selectedModule.id)}
            onClose={handleGoBack}
            onModuleComplete={handleModuleCompletion}
            onQuizComplete={handleQuizCompletion}
            language={currentLanguage}
            texts={{ 
              back: texts.back,
              loading: texts.loading
            }}
          />
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{texts.yourModules}</h2>
          <ModulesList 
            modules={modules}
            onSelectModule={handleSelectModule}
            completedModuleIds={completedModuleIds}
            currentLanguage={currentLanguage}
            courseTranslations={courseTranslations}
          />
        </>
      )}
    </>
  );
};

export default LessonsTab;
