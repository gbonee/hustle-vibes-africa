
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Languages, CircleUser } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserPreferencesProps {
  userName: string;
  userPrefs: {
    language?: string;
    avatar?: string;
  } | null;
  languageNames: Record<string, string>;
  avatarNames: Record<string, string>;
}

// Translations for UI elements
const uiTranslations = {
  pidgin: {
    displayName: 'Display Name',
    languagePreference: 'Language Preference',
    aiCoach: 'AI Coach',
    notSet: 'Not set',
    saveChanges: 'Save Changes',
  },
  yoruba: {
    displayName: 'Orúkọ Ìfihàn',
    languagePreference: 'Àṣàyàn Èdè',
    aiCoach: 'Olùkọ́ AI',
    notSet: 'Ko ṣeto sibẹsibẹ',
    saveChanges: 'Fi Àwọn Àyípadà Pamọ́',
  },
  hausa: {
    displayName: 'Nuna Suna',
    languagePreference: 'Zaɓin Harshe',
    aiCoach: 'Kocin AI',
    notSet: 'Ba a saita ba',
    saveChanges: 'Ajiye Canjin',
  },
  igbo: {
    displayName: 'Gosipụta Aha',
    languagePreference: 'Họrọ Asụsụ',
    aiCoach: 'Onye nkuzi AI',
    notSet: 'Ewepụtaghị',
    saveChanges: 'Chekwaa Mgbanwe',
  },
  english: {
    displayName: 'Display Name',
    languagePreference: 'Language Preference',
    aiCoach: 'AI Coach',
    notSet: 'Not set',
    saveChanges: 'Save Changes',
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
  
  const currentLanguage = userPrefs?.language || 'pidgin';
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
        <Label htmlFor="language">{texts.languagePreference}</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
            {userPrefs?.language ? languageNames[userPrefs.language] : texts.notSet}
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
            {userPrefs?.avatar ? avatarNames[userPrefs.avatar] : texts.notSet}
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
