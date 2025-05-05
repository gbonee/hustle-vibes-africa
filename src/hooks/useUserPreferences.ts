
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
          // Note: We're storing preferences in localStorage and in user metadata
          // since the profiles table doesn't have language_preference and avatar_preference columns
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          // Get preferences from user metadata or local storage
          const userMetadata = user.user_metadata || {};
          
          if (profile) {
            const dbPrefs = {
              language: userMetadata.language_preference || userPrefs?.language || 'pidgin',
              avatar: userMetadata.avatar_preference || userPrefs?.avatar || null,
              course: userMetadata.course_preference || userPrefs?.course || 'digital-marketing'
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
        // Update user metadata with preferences
        await supabase.auth.updateUser({
          data: {
            language_preference: newPrefs.language !== undefined ? newPrefs.language : userPrefs?.language,
            avatar_preference: newPrefs.avatar !== undefined ? newPrefs.avatar : userPrefs?.avatar,
            course_preference: newPrefs.course !== undefined ? newPrefs.course : userPrefs?.course
          }
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error updating user preferences:", error);
      return false;
    }
  };
  
  return { userPrefs, updateUserPreferences, isLoading };
};
