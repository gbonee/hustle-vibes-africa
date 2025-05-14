
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, Video } from "lucide-react";

export interface Module {
  id: number;
  title: string;
  hasVideo: boolean;
  completed: boolean;
  locked: boolean;
}

interface ModulesListProps {
  modules: Module[];
  onSelectModule: (module: Module) => void;
  completedModuleIds?: number[];
  currentLanguage?: string;
  courseTranslations?: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    };
  };
}

const ModulesList: React.FC<ModulesListProps> = ({ 
  modules, 
  onSelectModule, 
  completedModuleIds = [], 
  currentLanguage = 'pidgin',
  courseTranslations 
}) => {
  // Get translated header text based on language
  const getHeaderText = () => {
    switch (currentLanguage) {
      case 'yoruba':
        return 'Àwọn Módù Rẹ';
      case 'hausa':
        return 'Modules Naka';
      case 'igbo':
        return 'Modules Gị';
      case 'pidgin':
      default:
        return 'Your Modules';
    }
  };

  // Get translated title if available
  const getModuleTitle = (module: Module) => {
    if (courseTranslations && courseTranslations[currentLanguage]) {
      const translatedModule = courseTranslations[currentLanguage].modules.find(
        m => m.id === module.id
      );
      if (translatedModule) {
        return translatedModule.title;
      }
    }
    return module.title;
  };

  // Check if a module is completed from the completedModuleIds array
  const isModuleCompleted = (moduleId: number) => {
    return completedModuleIds.includes(moduleId);
  };

  // Determine if a module should be unlocked based on completed modules
  const shouldUnlockModule = (moduleIndex: number, moduleId: number) => {
    // First module is always unlocked
    if (moduleIndex === 0) return true;
    
    // Get the previous module in the list
    const previousModule = modules[moduleIndex - 1];
    
    // If previous module is completed, unlock this one
    return previousModule && (previousModule.completed || isModuleCompleted(previousModule.id));
  };

  // Get translated "Video" text
  const getVideoText = () => {
    switch (currentLanguage) {
      case 'yoruba':
        return 'Fídíò';
      case 'hausa':
        return 'Bidiyo';
      case 'igbo':
        return 'Vidio';
      case 'pidgin':
      default:
        return 'Video';
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">{getHeaderText()}</h2>
      <div className="space-y-3">
        {modules.map((module, index) => {
          // Determine if the module should be locked or unlocked
          const unlocked = shouldUnlockModule(index, module.id);
          
          // Create a new module object with updated locked status
          const updatedModule = {
            ...module,
            locked: !unlocked && !module.completed && !isModuleCompleted(module.id)
          };
          
          return (
            <Card 
              key={module.id}
              onClick={() => onSelectModule(updatedModule)}
              className={`cursor-pointer transition-all hover:border-electric ${
                updatedModule.locked 
                  ? 'opacity-60' 
                  : isModuleCompleted(module.id) || module.completed
                  ? 'border-green-500 bg-black' 
                  : 'bg-black'
              }`}
            >
              <CardContent className="p-4 flex items-center">
                {isModuleCompleted(module.id) || module.completed ? (
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <CircleCheck className="h-5 w-5 text-green-500" />
                  </div>
                ) : updatedModule.locked ? (
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <span className="text-xs">🔒</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center mr-3">
                    <span className="text-xs">{module.id}</span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{getModuleTitle(module)}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {module.hasVideo && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        <Video className="inline-block w-3 h-3 mr-1" />
                        {getVideoText()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ModulesList;
