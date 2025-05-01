
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
  onModuleSelect: (module: Module) => void;
}

const ModulesList: React.FC<ModulesListProps> = ({ modules, onModuleSelect }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Your Modules</h2>
      <div className="space-y-3">
        {modules.map((module) => (
          <Card 
            key={module.id}
            onClick={() => onModuleSelect(module)}
            className={`cursor-pointer transition-all hover:border-electric ${
              module.locked 
                ? 'opacity-60' 
                : module.completed 
                ? 'border-green-500 bg-black' 
                : 'bg-black'
            }`}
          >
            <CardContent className="p-4 flex items-center">
              {module.completed ? (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <CircleCheck className="h-5 w-5 text-green-500" />
                </div>
              ) : module.locked ? (
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                  <span className="text-xs">🔒</span>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center mr-3">
                  <span className="text-xs">{module.id}</span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium">{module.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {module.hasVideo && (
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      <Video className="inline-block w-3 h-3 mr-1" />
                      Video
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ModulesList;
