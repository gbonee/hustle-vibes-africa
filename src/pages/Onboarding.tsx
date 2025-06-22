
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import LanguageSelector from '@/components/onboarding/LanguageSelector';
import AvatarSelector from '@/components/onboarding/AvatarSelector';
import WelcomeMessage from '@/components/onboarding/WelcomeMessage';
import PathSelector from '@/components/landing/PathSelector';

interface OnboardingProps {
  onComplete?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedPath, setSelectedPath] = useState<'core' | 'pro' | ''>('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if path is pre-selected from URL
  useEffect(() => {
    const pathFromUrl = searchParams.get('path');
    if (pathFromUrl === 'core' || pathFromUrl === 'pro') {
      setSelectedPath(pathFromUrl);
      setCurrentStep(1); // Skip path selection if pre-selected
    }
  }, [searchParams]);

  const steps = selectedPath ? [
    'path-selection',
    'language',
    'avatar',
    'welcome'
  ] : [
    'language',
    'avatar', 
    'welcome'
  ];

  const handlePathSelect = (path: 'core' | 'pro') => {
    setSelectedPath(path);
    setCurrentStep(1);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentStep(2);
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setCurrentStep(3);
  };

  const handleComplete = async () => {
    if (!selectedLanguage || !selectedAvatar || !selectedPath) {
      toast({
        title: "Error",
        description: "Please complete all steps",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to complete onboarding",
          variant: "destructive",
        });
        return;
      }

      // Update user profile with preferences
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          learning_path: selectedPath,
          preferred_languages: [selectedLanguage],
          avatar_url: selectedAvatar,
          display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Welcome to USABI!",
        description: `You're all set up for ${selectedPath === 'core' ? 'USABI Core' : 'USABI Pro'}!`,
      });

      if (onComplete) {
        onComplete();
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to complete onboarding",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStep === 0 && !selectedPath) {
    return <PathSelector onPathSelect={handlePathSelect} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <OnboardingHeader 
        currentStep={currentStep} 
        totalSteps={steps.length - 1}
        selectedPath={selectedPath as 'core' | 'pro'}
      />
      
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-2xl bg-dark-card border-gray-800">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <LanguageSelector 
                onLanguageSelect={handleLanguageSelect}
                selectedPath={selectedPath as 'core' | 'pro'}
              />
            )}
            
            {currentStep === 2 && (
              <AvatarSelector 
                onAvatarSelect={handleAvatarSelect}
                selectedLanguage={selectedLanguage}
                selectedPath={selectedPath as 'core' | 'pro'}
              />
            )}
            
            {currentStep === 3 && (
              <div>
                <WelcomeMessage 
                  selectedLanguage={selectedLanguage}
                  selectedAvatar={selectedAvatar}
                  selectedPath={selectedPath as 'core' | 'pro'}
                />
                <Button 
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="w-full mt-6 rebel-button"
                >
                  {isLoading ? "Setting up..." : "Start Learning"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
