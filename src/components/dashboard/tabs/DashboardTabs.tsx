
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, MessageSquare } from "lucide-react";
import ModulesList from '@/components/dashboard/ModulesList';
import ModuleDetail from '@/components/dashboard/ModuleDetail';
import AIChat from '@/components/dashboard/chat/AIChat';
import { Module } from '@/components/dashboard/ModulesList';
import { Quiz } from '@/types/quiz';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getTranslatedQuizzes } from '@/utils/quizHelper';

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedModule: Module | null;
  setSelectedModule: (module: Module | null) => void;
  isLoading: boolean;
  modules: Module[];
  completedModuleIds: number[];
  currentLanguage: string;
  courseAvatar: string;
  courseTranslations: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    };
  };
  handleModuleComplete: (module: Module) => void;
  handleQuizComplete: (module: Module, correct: boolean) => void;
  userName: string;
  texts: {
    lessons: string;
    chat: string;
    yourModules?: string;
    back?: string;
    loading?: string;
  };
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  selectedModule,
  setSelectedModule,
  isLoading,
  modules,
  completedModuleIds,
  currentLanguage,
  courseAvatar,
  courseTranslations,
  handleModuleComplete,
  handleQuizComplete,
  userName,
  texts
}) => {
  const { toast } = useToast();
  
  // Handle module selection
  const handleModuleSelect = (module: Module) => {
    if (module.locked) {
      toast({
        title: "Module locked",
        description: "Complete the previous modules to unlock this one!",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setSelectedModule(module);
  };
  
  // Get module-specific quizzes based on the selected module
  const getQuizzesForModule = (): Quiz[] => {
    if (!selectedModule) return [];
    
    // Get the quizzes specific to this module
    return getTranslatedQuizzes(selectedModule.id);
  };

  return (
    <Tabs
      defaultValue="lessons"
      value={activeTab}
      onValueChange={setActiveTab}
      className="mt-6 h-full flex flex-col"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="lessons" className="text-xs sm:text-base">
          <Video className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {texts.lessons}
        </TabsTrigger>
        <TabsTrigger value="chat" className="text-xs sm:text-base">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {texts.chat}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="lessons" className="mt-6 space-y-6 flex-1">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 rounded-md" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-20 rounded-md" />
              ))}
            </div>
          </div>
        ) : selectedModule ? (
          <ModuleDetail 
            module={selectedModule} 
            quizzes={getQuizzesForModule()}
            onClose={() => setSelectedModule(null)}
            onModuleComplete={() => handleModuleComplete(selectedModule)}
            onQuizComplete={(correct) => handleQuizComplete(selectedModule, correct)}
            language={currentLanguage}
            texts={{
              back: texts.back || "Back to All Modules",
              loading: texts.loading || "Loading..."
            }}
          />
        ) : (
          <ModulesList 
            modules={modules} 
            onSelectModule={handleModuleSelect}
            completedModuleIds={completedModuleIds}
            currentLanguage={currentLanguage}
            courseTranslations={courseTranslations}
          />
        )}
      </TabsContent>
      
      <TabsContent value="chat" className="mt-6 flex-1 flex flex-col h-[calc(85vh-100px)]">
        <AIChat 
          courseAvatar={courseAvatar} 
          userName={userName}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
