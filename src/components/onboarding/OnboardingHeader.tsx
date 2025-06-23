
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  selectedPath: 'core' | 'pro';
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ currentStep, totalSteps, selectedPath }) => {
  const progressValue = ((currentStep + 1) / (totalSteps + 1)) * 100;
  
  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
            alt="uSabi AI Owl Mascot" 
            className="h-12 w-auto" 
          />
          <span className="text-4xl font-oswald font-bold text-electric">
            uSabi <span className="text-white">AI</span>
          </span>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-center mb-2">
          <span className={`text-sm font-medium ${selectedPath === 'pro' ? 'text-yellow-400' : 'text-purple-400'}`}>
            {selectedPath === 'pro' ? 'USABI Pro Setup' : 'USABI Core Setup'}
          </span>
        </div>
        <Progress value={progressValue} className="h-2" />
        <div className="text-center mt-2 text-xs text-gray-400">
          Step {currentStep + 1} of {totalSteps + 1}
        </div>
      </div>
    </>
  );
};

export default OnboardingHeader;
