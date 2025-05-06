
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import PreviewMode from '@/components/common/PreviewMode';
import { useUserPreferences } from '@/hooks/useUserPreferences';

// Import our components
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';
import LanguageSelector from '@/components/onboarding/LanguageSelector';
import AvatarSelector from '@/components/onboarding/AvatarSelector';
import WelcomeMessage from '@/components/onboarding/WelcomeMessage';
import { avatars } from '@/components/onboarding/AvatarData';

type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo';
type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';

interface OnboardingProps {
  onComplete?: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language | null>(null);
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [animateMessage, setAnimateMessage] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const { updateUserPreferences, userPrefs } = useUserPreferences();
  
  // Check if we're in preview mode and initialize with preferences
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);
    
    // Set default values from existing preferences
    if (userPrefs) {
      if (userPrefs.language && !language) {
        setLanguage(userPrefs.language as Language);
      }
      
      if (userPrefs.avatar && !avatar) {
        setAvatar(userPrefs.avatar as Avatar);
      }
    }
    
    // Set default language in preview mode for testing
    if (preview && !language) {
      setLanguage('pidgin');
    }
  }, [language, userPrefs]);

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    
    // Save language preference immediately
    updateUserPreferences({ language: selectedLanguage });
    
    setTimeout(() => setStep(2), 500);
  };

  const handleAvatarSelect = async (selectedAvatar: Avatar) => {
    setAvatar(selectedAvatar);
    setAnimateMessage(true);
    
    // Find the corresponding course for the selected avatar
    const selectedAvatarObj = avatars.find(a => a.id === selectedAvatar);
    
    // Skip saving to Supabase in preview mode
    if (isPreviewMode) {
      // Even in preview mode, update localStorage
      if (selectedAvatarObj) {
        updateUserPreferences({
          avatar: selectedAvatar,
          course: selectedAvatarObj.course
        });
      }
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      return;
    }
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      try {
        // Save user preferences to Supabase
        const userPreferences = {
          language,
          avatar: selectedAvatar,
          course: selectedAvatarObj?.course
        };
        
        // Update preferences using our hook
        await updateUserPreferences(userPreferences);
        
        // Mark onboarding as completed for this user
        localStorage.setItem(`onboarding_completed_${user.id}`, 'true');
        
        // Wait for animation to complete before redirecting to dashboard
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
          navigate('/dashboard');
        }, 3000);
      } catch (error) {
        console.error("Error saving user preferences:", error);
        // Still navigate to dashboard even if error occurs
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
          navigate('/dashboard');
        }, 3000);
      }
    }
  };

  const selectedAvatarInfo = avatar ? avatars.find(a => a.id === avatar) : null;

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
      {isPreviewMode && <PreviewMode />}
      
      <div className="w-full max-w-md">
        <OnboardingHeader step={step} />

        <Card className="border-electric bg-muted overflow-hidden">
          <CardContent className="p-6">
            {step === 1 && (
              <LanguageSelector 
                selectedLanguage={language} 
                onSelectLanguage={handleLanguageSelect} 
              />
            )}
            
            {step === 2 && (
              <AvatarSelector 
                avatars={avatars} 
                selectedAvatar={avatar} 
                onSelectAvatar={handleAvatarSelect}
                language={language || 'pidgin'}
              />
            )}
            
            {avatar && animateMessage && (
              <WelcomeMessage 
                selectedAvatar={selectedAvatarInfo} 
                language={language} 
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
