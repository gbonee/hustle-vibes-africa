
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface UserPreferences {
  language: string;
  avatar: string;
  course: string;
}

interface ChallengeStatus {
  hasSubmitted: boolean;
  isApproved: boolean;
  submissionUrl?: string;
  submissionType?: string;
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
  
  const getChallengeStatus = async (challengeId: string): Promise<ChallengeStatus> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { hasSubmitted: false, isApproved: false };
      
      const { data: submission } = await supabase
        .from('challenge_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .maybeSingle();
      
      if (submission) {
        return {
          hasSubmitted: true,
          isApproved: submission.is_approved || false,
          submissionUrl: submission.submission_url,
          submissionType: submission.submission_type
        };
      }
      
      return { hasSubmitted: false, isApproved: false };
    } catch (error) {
      console.error("Error checking challenge status:", error);
      return { hasSubmitted: false, isApproved: false };
    }
  };
  
  const submitChallengeFile = async (challengeId: string, file: File): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      // First upload the file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `challenge_submissions/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('challenges')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        return false;
      }
      
      // Get the public URL
      const { data: publicURL } = supabase.storage
        .from('challenges')
        .getPublicUrl(filePath);
      
      if (!publicURL) return false;
      
      // Check if a submission already exists
      const { data: existingSubmission } = await supabase
        .from('challenge_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .maybeSingle();
        
      if (existingSubmission) {
        // Update existing submission
        const { error: updateError } = await supabase
          .from('challenge_submissions')
          .update({
            submission_url: publicURL.publicUrl,
            submission_type: file.type,
            submitted_at: new Date().toISOString(),
            is_approved: false
          })
          .eq('id', existingSubmission.id);
          
        if (updateError) {
          console.error("Error updating submission:", updateError);
          return false;
        }
      } else {
        // Create new submission
        const { error: insertError } = await supabase
          .from('challenge_submissions')
          .insert({
            user_id: user.id,
            challenge_id: challengeId,
            submission_url: publicURL.publicUrl,
            submission_type: file.type,
            submitted_at: new Date().toISOString(),
            is_approved: false
          });
          
        if (insertError) {
          console.error("Error creating submission:", insertError);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error submitting challenge:", error);
      return false;
    }
  };
  
  return { 
    userPrefs, 
    updateUserPreferences, 
    isLoading,
    getChallengeStatus,
    submitChallengeFile
  };
};
