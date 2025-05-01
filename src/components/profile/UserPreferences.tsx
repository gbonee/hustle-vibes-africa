
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Languages, CircleUser } from "lucide-react";

interface UserPreferencesProps {
  userName: string;
  userPrefs: {
    language?: string;
    avatar?: string;
  } | null;
  languageNames: Record<string, string>;
  avatarNames: Record<string, string>;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ 
  userName, 
  userPrefs, 
  languageNames, 
  avatarNames 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="display-name">Display Name</Label>
        <Input 
          id="display-name"
          defaultValue={userName}
          className="mt-1 bg-muted border-gray-700"
        />
      </div>
      
      <div>
        <Label htmlFor="language">Language Preference</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
            {userPrefs?.language ? languageNames[userPrefs.language] : 'Not set'}
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
        <Label htmlFor="ai-coach">AI Coach</Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
            {userPrefs?.avatar ? avatarNames[userPrefs.avatar] : 'Not set'}
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
      
      <Button className="w-full mt-2 rebel-button">
        Save Changes
      </Button>
    </div>
  );
};

export default UserPreferences;
