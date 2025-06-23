
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Languages, CircleUser, Globe, Zap } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserPreferencesProps {
  userName: string;
  userPrefs: {
    language?: string;
    avatar?: string;
    learning_path?: string;
    preferred_languages?: string[];
    pro_subscription_active?: boolean;
  } | null;
  languageNames: Record<string, string>;
  avatarNames: Record<string, string>;
}

// Translations for UI elements
const uiTranslations = {
  pidgin: {
    displayName: 'Display Name',
    languagePreference: 'Language Preference',
    learningPath: 'Learning Path',
    aiCoach: 'AI Coach',
    notSet: 'Not set',
    saveChanges: 'Save Changes',
    coreDescription: 'Local skills in your language',
    proDescription: 'AI skills in English',
    upgradeButton: 'Upgrade to Pro',
  },
  yoruba: {
    displayName: 'Orúkọ Ìfihàn',
    languagePreference: 'Àṣàyàn Èdè',
    learningPath: 'Ọ̀nà Ìkẹ́kọ̀ọ́',
    aiCoach: 'Olùkọ́ AI',
    notSet: 'Ko ṣeto sibẹsibẹ',
    saveChanges: 'Fi Àwọn Àyípadà Pamọ́',
    coreDescription: 'Àwọn ọgbọ́n ìbílẹ̀ ní èdè yín',
    proDescription: 'Àwọn ọgbọ́n AI ní Gẹ̀ẹ́sì',
    upgradeButton: 'Gòkè sí Pro',
  },
  hausa: {
    displayName: 'Nuna Suna',
    languagePreference: 'Zaɓin Harshe',
    learningPath: 'Hanyar Koyo',
    aiCoach: 'Kocin AI',
    notSet: 'Ba a saita ba',
    saveChanges: 'Ajiye Canjin',
    coreDescription: 'Fasahar gida da harshenku',
    proDescription: 'Fasahar AI da Turanci',
    upgradeButton: 'Haɓaka zuwa Pro',
  },
  igbo: {
    displayName: 'Gosipụta Aha',
    languagePreference: 'Họrọ Asụsụ',
    learningPath: 'Ụzọ Mmụta',
    aiCoach: 'Onye nkuzi AI',
    notSet: 'Ewepụtaghị',
    saveChanges: 'Chekwaa Mgbanwe',
    coreDescription: 'Nkà obodo n\'asụsụ gị',
    proDescription: 'Nkà AI n\'Bekee',
    upgradeButton: 'Kwalite na Pro',
  },
  english: {
    displayName: 'Display Name',
    languagePreference: 'Language Preference',
    learningPath: 'Learning Path',
    aiCoach: 'AI Coach',
    notSet: 'Not set',
    saveChanges: 'Save Changes',
    coreDescription: 'Local skills in your language',
    proDescription: 'AI skills in English',
    upgradeButton: 'Upgrade to Pro',
  }
};

const UserPreferences: React.FC<UserPreferencesProps> = ({ 
  userName, 
  userPrefs, 
  languageNames, 
  avatarNames 
}) => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(userName);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentLanguage = userPrefs?.preferred_languages?.[0] || userPrefs?.language || 'pidgin';
  const texts = uiTranslations[currentLanguage as keyof typeof uiTranslations] || uiTranslations.english;
  
  const handleSaveChanges = async () => {
    if (displayName.trim() === userName) {
      toast({
        description: "No changes to save.",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save changes.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile display name
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName.trim() })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Your changes have been saved.",
      });
      
    } catch (error: any) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeToPro = () => {
    // Navigate to upgrade flow or show upgrade modal
    toast({
      title: "Upgrade to USABI Pro",
      description: "Unlock AI skills and earn more! Coming soon...",
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="display-name">{texts.displayName}</Label>
        <Input 
          id="display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="mt-1 bg-muted border-gray-700"
        />
      </div>

      <div>
        <Label htmlFor="learning-path">{texts.learningPath}</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center">
              {userPrefs?.learning_path === 'pro' ? (
                <Zap className="h-4 w-4 text-yellow-400 mr-2" />
              ) : (
                <Globe className="h-4 w-4 text-purple-400 mr-2" />
              )}
              <div>
                <div className="font-medium">
                  {userPrefs?.learning_path === 'pro' ? 'USABI Pro' : 'USABI Core'}
                </div>
                <div className="text-sm text-gray-400">
                  {userPrefs?.learning_path === 'pro' ? texts.proDescription : texts.coreDescription}
                </div>
              </div>
            </div>
            {userPrefs?.learning_path === 'core' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUpgradeToPro}
                className="bg-yellow-600 hover:bg-yellow-700 text-black border-yellow-500"
              >
                {texts.upgradeButton}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="language">{texts.languagePreference}</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
            <div className="flex flex-wrap gap-1">
              {userPrefs?.preferred_languages?.map((lang) => (
                <Badge key={lang} variant="secondary" className="bg-purple-700/50 text-purple-200">
                  {languageNames[lang] || lang}
                </Badge>
              )) || <span className="text-gray-400">{texts.notSet}</span>}
            </div>
          </div>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigate('/onboarding')}
          >
            <Languages className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="ai-coach">{texts.aiCoach}</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
            {userPrefs?.avatar ? avatarNames[userPrefs.avatar] || 'Custom Avatar' : texts.notSet}
          </div>
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigate('/onboarding')}
          >
            <CircleUser className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Button 
        className="w-full mt-2 rebel-button"
        onClick={handleSaveChanges}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : texts.saveChanges}
      </Button>
    </div>
  );
};

export default UserPreferences;
