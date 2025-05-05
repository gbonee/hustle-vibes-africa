
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface UserPreferences {
  language: string;
  avatar: string;
  course: string;
}

export const useUserPreferences = () => {
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUserPreferences = async () => {
      setIsLoading(true);
      // First try to get from localStorage
      const savedPrefs = localStorage.getItem('userPreferences');
      
      if (savedPrefs) {
        setUserPrefs(JSON.parse(savedPrefs));
      }
      
      // Try to get from Supabase if user is logged in
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Get user preferences from profiles table
          const { data: profile } = await supabase
            .from('profiles')
            .select('language_preference, avatar_preference')
            .eq('id', user.id)
            .single();
            
          if (profile) {
            const dbPrefs = {
              language: profile.language_preference || userPrefs?.language || 'pidgin',
              avatar: profile.avatar_preference || userPrefs?.avatar || null,
              course: userPrefs?.course || 'digital-marketing'
            };
            
            setUserPrefs(dbPrefs);
            localStorage.setItem('userPreferences', JSON.stringify(dbPrefs));
          }
        }
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserPreferences();
  }, []);

  const updateUserPreferences = async (newPrefs: Partial<UserPreferences>) => {
    try {
      // Update local state and localStorage first for immediate feedback
      const updatedPrefs = { ...userPrefs, ...newPrefs } as UserPreferences;
      localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
      setUserPrefs(updatedPrefs);
      
      // Update in Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .update({
            language_preference: newPrefs.language !== undefined ? newPrefs.language : userPrefs?.language,
            avatar_preference: newPrefs.avatar !== undefined ? newPrefs.avatar : userPrefs?.avatar
          })
          .eq('id', user.id);
      }
      
      return true;
    } catch (error) {
      console.error("Error updating user preferences:", error);
      return false;
    }
  };
  
  return { userPrefs, updateUserPreferences, isLoading };
};
